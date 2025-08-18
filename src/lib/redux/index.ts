import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import projectReducer from "./slice/projectSlice";
import taskReducer from "./slice/taskSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  task: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
