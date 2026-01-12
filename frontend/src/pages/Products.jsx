import { useEffect, useState, useContext, useCallback } from "react";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";
import { FilterContext } from "../context/FilterContext";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { addToCart } = useContext(CartContext);
  const {
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    sizeFilter,
    setSizeFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  } = useContext(FilterContext);

  const navigate = useNavigate();

  const fetchProducts = useCallback(
    async (pageNumber = 1) => {
      try {
        setLoading(true);
        let query = `/products?page=${pageNumber}&limit=10`;
        if (search) query += `&search=${encodeURIComponent(search)}`;
        if (categoryFilter) query += `&category=${encodeURIComponent(categoryFilter)}`;
        if (sizeFilter) query += `&size=${encodeURIComponent(sizeFilter)}`;
        if (minPrice !== undefined && maxPrice !== undefined) {
          query += `&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        }
        const res = await api.get(query);
        const productsData = res.data.products || [];
        const defaultSizes = {};
        productsData.forEach((product) => {
          if (product.sizes?.length) defaultSizes[product._id] = product.sizes[0];
        });
        setSelectedSize(defaultSizes);
        setProducts(productsData);
        setTotalPages(res.data.pages || 1);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    },
    [search, categoryFilter, sizeFilter, minPrice, maxPrice]
  );

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const handleAddToCart = async (product) => {
    const size = selectedSize[product._id];
    try {
      await addToCart({
        product: {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          sizes: product.sizes,
          category: product.category,
        },
        size,
        quantity: 1,
      });
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error("Failed to add item to cart.");
    }
  };

  const handleSizeSelect = (productId, size) => {
    setSelectedSize((prev) => ({ ...prev, [productId]: size }));
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchProducts(prevPage);
    }
  };

  return (
    <div className="p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded w-64"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
        <select
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Sizes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <div className="ml-4 mt-4 mr-3 w-52">
          <input
            type="range"
            min={0}
            max={4000}
            step={50}
            value={minPrice}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value <= maxPrice) setMinPrice(value);
            }}
            className="w-full accent-black"
          />
          <input
            type="range"
            min={0}
            max={4000}
            step={50}
            value={maxPrice}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= minPrice) setMaxPrice(value);
            }}
            className="w-full mt-2 accent-black"
          />
          <div className="flex justify-between text-sm font-semibold mt-2">
            <span>Rs. {minPrice}</span>
            <span>Rs. {maxPrice}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <Loading size="w-16 h-16" color="border-green-500" />
      ) : error ? (
        <div className="p-8 text-center text-red-600">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <div
                onClick={() => navigate(`/product/${product._id}`)}
                key={product._id}
                className="border-2 border-gray-500 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col cursor-pointer"
              >
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={`/images/${product.image}`}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
                  <p className="text-gray-700 text-sm mb-2 line-clamp-2">
                    {product.description || "No description"}
                  </p>
                  <p className="font-bold text-xl mb-4">
                    Rs.{product.price.toFixed(2)}
                  </p>

                  {product.sizes?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Select Size:</p>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSizeSelect(product._id, size);
                            }}
                            className={`px-3 py-1 border rounded text-sm ${
                              selectedSize[product._id] === size
                                ? "bg-black text-white border-black"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="mt-auto w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
