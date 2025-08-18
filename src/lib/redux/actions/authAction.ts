import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../util/axiosInstance";
import { LoginFormData } from "@/lib/util/Interface";
import { SignupFormInputs } from "@/app/(auth)/signup/page";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: SignupFormInputs, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const response = await axiosInstance.post(
        `/api/v1/auth/signup`,
        userData,
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData: LoginFormData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const response = await axiosInstance.post(
        `/api/v1/auth/login`,
        userData,
        config
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (
    { email, otp, type }: { email: string; otp: string; type: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/verify-otp", {
        email,
        otp,
        type,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/auth/forgot-password",
        { email }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    {
      email,
      otp,
      newPassword,
    }: { email: string; otp: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/api/v1/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
    }
  }
);
