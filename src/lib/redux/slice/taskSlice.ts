import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "./projectSlice";
import { addTask, getTasksByProject, updateTask } from "../actions/taskAction";
import toast from "react-hot-toast";

export interface Tasks {}
interface InitialState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  tasks: Tasks[];
  paginate: Pagination;
  newTaskAdded: boolean;
}

const initialState: InitialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  tasks: [{}],
  paginate: {
    totalPages: 0,
    total: 0,
    limit: 0,
    page: 0,
  },
  newTaskAdded: false,
};

const taskSliceCreate = createSlice({
  name: "task",
  initialState,
  reducers: {
    manageTask: (state) => {
      state.newTaskAdded = true;
    },
     removeNewTaskAdded:(state)=>{
      state.newTaskAdded= false
     }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTask.rejected, (state) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        toast.error("Error in adding the task");
      })
      .addCase(addTask.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        toast("Task Added successfully");
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        toast("Task Updated Successfully");
      })
      .addCase(getTasksByProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasksByProject.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.tasks = [];
      })
      .addCase(getTasksByProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.tasks = action.payload.data;
        state.paginate = action.payload.paginate;
      });
  },
});
export const { manageTask, removeNewTaskAdded } = taskSliceCreate.actions;
export default taskSliceCreate.reducer;
