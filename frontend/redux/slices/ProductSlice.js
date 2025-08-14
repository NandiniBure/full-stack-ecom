import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const featchproductbyfilters = createAsyncThunk(
  "product/featchbyfilters",
  async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();

    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

   
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product?${query.toString()}`
    );

    return response.data;
  }
);

export const featchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`
    );
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProdust",
  async ({ id, productData }) => {
   
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`,
     productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

export const featchSimilarProducts = createAsyncThunk(
  "products/featchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/product/similar/${id}`
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null, // Store the details of the single Product
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      material: "",
      collection: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilter: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        material: "",
        collection: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(featchproductbyfilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(featchproductbyfilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(featchproductbyfilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.code.message;
      })
      // handle single prod details
      .addCase(featchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(featchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(featchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.code.message;
      })
      // Handle update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updateproduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.code.message;
      })
      .addCase(featchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(featchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(featchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearFilter } = productsSlice.actions;
export default productsSlice.reducer;
