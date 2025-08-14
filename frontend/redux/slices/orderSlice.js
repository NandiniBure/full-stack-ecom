import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

export const featchUserOrder = createAsyncThunk(
  "orders/featchUserOrder",
  async (_, { RejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );


      return response.data;
    } catch (error) {
      return RejectWithValue(error.response.data);
    }
  }
);

export const featchOrderDetails = createAsyncThunk(
  "orders/featchorderDetails",
  async (orderId, { RejectWithValue }) => {
    try {
      
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return RejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featchUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(featchUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(featchUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      //featch order details
      .addCase(featchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(featchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(featchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;