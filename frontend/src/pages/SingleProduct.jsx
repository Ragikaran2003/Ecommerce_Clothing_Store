import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

const SingleProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${productId}`);
        const data = response.data;
        setProduct(data);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
      } catch (err) {
        toast.error("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
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
        size: selectedSize,
        quantity,
      });
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error("Failed to add item to cart");
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    navigate("/cart");
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(prev => prev - 1);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <Loading message="Loading product details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-black"
        >
          &larr; Back to Products
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border-2 border-gray-400 rounded-lg overflow-hidden w-fit bg-gray-50 aspect-square">
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="w-full h-full object-contain p-4"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold">Rs.{product.price}</span>
          </div>

          {product.category && (
            <div className="mb-4">
              <span className="text-sm text-gray-600">Category: </span>
              <span className="font-medium">{product.category}</span>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Select Size:</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Quantity:</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="w-10 h-10 border rounded-full hover:bg-gray-100 disabled:opacity-50"
              >
                −
              </button>
              <span className="w-16 text-center font-medium">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="w-10 h-10 border rounded-full hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 border-2 border-black text-black py-3 rounded-lg font-medium hover:bg-black hover:text-white"
            >
              Buy Now
            </button>
          </div>

          {product.description && (
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
