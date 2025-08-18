// import { axiosInstance } from "@/util/axiosInstance";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// let config ={
//     headers:{
//         'Content-Type':'application/json'
//     }
// }
// export interface Task {
//   projectId: string;
//   title: string;
//   description: string;
//   due_date: string;  
//   status: "todo" | "in-progress" | "done"; 
// }

// export const addTask = createAsyncThunk(
//     'create/task',async(taskData:Task, {rejectWithValue})=>{
//        try {
//         const { projectId } = taskData
//         const { data } = await axiosInstance.post(`/api/v1/task/${projectId}`,taskData,config)
//         return data
//        } catch (error) {
//         return rejectWithValue(error)
//        }
//     }
// )


import { axiosInstance } from "@/util/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

let config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Task Interface
export interface Task {
  projectId: string;
  title: string;
  description: string;
  due_date: string;
  status: "todo" | "in-progress" | "done";
}

// Project Interface (for update)
export interface ProjectUpdate {
  id: string;
  title?: string;
  description?: string;
  status?: string;
}

 
 export const addTask = createAsyncThunk(
  "task/addTask",
  async (taskData: Task, { rejectWithValue }) => {
    try {
      const { projectId } = taskData;
      const { data } = await axiosInstance.post(
        `/api/v1/task/${projectId}`,
        taskData,
        config
      );
      return data ; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

 export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (
    { taskId, data }: { taskId: string; data: Partial<Task> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v1/task/user/${taskId}`,
        data,
        config
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

 export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/v1/task/user/${taskId}`);
      return response?.data?.data;  
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
 
export const getTasksByProject = createAsyncThunk(
  "task/getTasksByProject",
  async (
    { projectId, status }: { projectId: string; status?: string },
    { rejectWithValue }
  ) => {
    try {
      const query = status ? `?status=${status}` : "";
      const {data} = await axiosInstance.get(
        `/api/v1/task/${projectId}${query}`
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

 
export const updateProject = createAsyncThunk(
  "project/updateProject",
  async (projectData: ProjectUpdate, { rejectWithValue }) => {
    try {
      const { id, ...rest } = projectData;
      const response = await axiosInstance.put(
        `/api/v1/project/${id}`,
        rest,
        config
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
