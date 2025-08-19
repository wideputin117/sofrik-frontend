 

import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  verifyOTP,
  forgotPassword,
  resetPassword,
} from  "../actions/authAction"
import { LoggedInUser } from "@/lib/util/user.schema";
import toast from "react-hot-toast";

interface AuthState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLoggedIn: boolean;
  error: string | null;
  message: string | null;
 
  user: LoggedInUser | null;
 
}

const initialState: AuthState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isLoggedIn: false,
  error: null,
  message: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      Object.assign(state, initialState);
    },
    clearError: (state) => {
      state.isError = false;
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isSuccess=false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload?.message;
        toast.success(action?.payload?.message || "signup successfull");
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload as string;
        console.log("hey this is payload");
        console.log(action.payload, "payload");
        toast.error(action?.payload || "failed to signup");
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.payload as string;
        state.isLoggedIn = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isLoggedIn = true;
        state.message = action.payload?.message;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
      });
  },
});

export const { resetAuth, clearError, clearMessage, logout } =
  authSlice.actions;
export default authSlice.reducer;
