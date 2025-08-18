'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { createProject } from "@/lib/redux/actions/projectAction"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import toast from "react-hot-toast"

export interface ProjectFormData {
  title: string
  description: string
  status: "active" | "completed"    
}

const Page = () => {
  const dispatch = useAppDispatch()
  const { isLoading, isSuccess, isError } = useAppSelector((state) => state.project)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>()

  const onSubmit = (data: ProjectFormData) => {
    dispatch(createProject(data)).then(res=>{
        console.log("the res of creating project",res)
        const data = res.payload
        if(data?.success == true){
            toast('Project Added')
            reset()
        }
    })
  }
 
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4">Add New Project</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

         <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

         <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            {...register("status", { required: "Status is required" })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
        </div>

         <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Create Project"}
        </button>
      </form>
 
    </div>
  )
}

export default Page
