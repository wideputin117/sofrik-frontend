import { axiosInstance } from "@/util/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
let config ={
    headers:{
        'Content-Type':'application/json'
    }
}
export interface Task {
  projectId: string;
  title: string;
  description: string;
  due_date: string;  
  status: "todo" | "in-progress" | "done"; 
}

export const addTask = createAsyncThunk(
    'create/task',async(taskData:Task, {rejectWithValue})=>{
       try {
        const { projectId } = taskData
        const { data } = await axiosInstance.post(`/api/v1/task/${projectId}`,taskData,config)
        return data
       } catch (error) {
        return rejectWithValue(error)
       }
    }
)