import { createSlice } from "@reduxjs/toolkit";
import { Pagination } from "./projectSlice";
import { addTask } from "../actions/taskAction";
import toast from "react-hot-toast";

export interface Tasks{

}
interface InitialState{
    isLoading:boolean,
    isSuccess:boolean,
    isError:boolean,
    tasks:Tasks[],
    paginate:Pagination
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
};


const taskSliceCreate = createSlice({
    name:"task",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addTask.pending,state=>{
            state.isLoading=true
        })
        .addCase(addTask.rejected,state=>{
            state.isError=true
            state.isSuccess=false
            state.isLoading=false
            toast.error('Error in adding the task')
        })
        .addCase(addTask.fulfilled,state=>{
            state.isLoading=false
            state.isError=false
            state.isSuccess=true
            toast('Task Added successfully')
        })
    }
})

export default taskSliceCreate.reducer