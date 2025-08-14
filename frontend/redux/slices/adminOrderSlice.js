import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

export const featchAllOrders = createAsyncThunk(
  "adminOrders/featchAllOrders",
  async (_DO_NOT_USE_ActionTypes, { rejectWithValue }) => {
    try {
      

      const response = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: {
          Authorization: USER_TOKEN,
        },
      });

     
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message.data);
    }
  }
);

export const UpdateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrdersstatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      console.log("ggggggggggg")
      const response = await axios.put(
        `${API_URL}/api/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: USER_TOKEN,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/api/admin/orders/${id}`,

        {
          headers: {
            Authorization: USER_TOKEN,
          },
        }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.message.data);
    }
  }
);

const adminOrdersSlice = createSlice({
  name: "adminOrder",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(featchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;

        console.log("111",action.payload)

        const totalSales = action.payload.reduce((acc, order) => {
          return acc + order.totalPrice;
        }, 0);

        state.totalSales = totalSales;
      })
      .addCase(featchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update order status
      .addCase(UpdateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        console.log()
        const orderIndex = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (orderIndex !== -1) {
          state.orders[orderIndex] = updatedOrder;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      });
  },
});

export default adminOrdersSlice.reducer;