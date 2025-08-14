import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const featchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  console.log("fkjdns");
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/user`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    }
  );

  return response.data;
});

export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/user`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "admin/updatedUser",
  async ({ id, name, email, role }, { rejectWithValue }) => {
    try {
      console.log(id, name, email, role);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/user/${id}`,
        {
          name,
          email,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
  await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return id;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(featchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(featchUsers.fulfilled, (state, action) => {
        state.loading = false;
        console.log("---->", action.payload);
        state.users = action.payload;
      })
      .addCase(featchUsers.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload; // this comes from return response.data;
        const userIndex = state.users.findIndex(
          (user) => user._id === updatedUser.user._id
        );
        console.log("------->",updatedUser)
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser.user;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
      })
      .addCase(addUser.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
