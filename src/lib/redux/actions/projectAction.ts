import { axiosInstance } from "@/util/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Project } from "../slice/projectSlice";
export interface ProjectFormData {
  title: string;
  description: string;
  status: string;
}

let config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getProjects = createAsyncThunk(
  "get/projects",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/project?page=${page}&limit=${limit}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProject = createAsyncThunk(
  "create/project",
  async (projectData: ProjectFormData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/v1/project`,
        projectData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProject = createAsyncThunk(
  "update/project",
  async (projectdata: Partial<Project>, { rejectWithValue }) => {
    try {
      const { _id } = projectdata;
      const { data } = await axiosInstance.patch(
        `/api/v1/project/${_id}`,
        projectdata,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "delete/project",
  async (_id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/api/v1/project/${_id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProjectById = createAsyncThunk(
  "getByProjectById/project",
  async (_id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/project/${_id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
