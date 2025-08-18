import { createSlice } from "@reduxjs/toolkit";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getProjectById,
} from "../actions/projectAction";

export interface Project {
  _id: string;
  title: string;
  description: string;
  status: string;
  tasks:any[]
}

export interface Pagination {
  totalPages: number;
  total: number;
  limit: number;
  page: number;
}

interface InitialState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  projects: Project[];
  project?: Project | null;  
  paginate: Pagination;
}

const initialState: InitialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  projects: [],
  project: null,
  paginate: {
    totalPages: 0,
    total: 0,
    limit: 0,
    page: 0,
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetProjectState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getProjects.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.projects = action.payload.data;
        state.paginate = action.payload.paginate;
      })
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(createProject.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.projects.unshift(action.payload.data);
      })
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(updateProject.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        const updated = action.payload.data;
        state.projects = state.projects.map((proj) =>
          proj._id === updated._id ? updated : proj
        );
      })

      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getProjectById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.project = action.payload.data;
      });
  },
});

export const { resetProjectState } = projectSlice.actions;
export default projectSlice.reducer;
