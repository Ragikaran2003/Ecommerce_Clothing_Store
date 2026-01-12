import { createContext, useState, useCallback } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4000);

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setSizeFilter("");
    setMinPrice(0);
    setMaxPrice(4000);
  };

  const value = {
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
    resetFilters,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
