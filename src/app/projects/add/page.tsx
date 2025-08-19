"use client"

import GuardRoute from "@/components/GaurdRouteComponent"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { createProject } from "@/lib/redux/actions/projectAction"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

export interface ProjectFormData {
  title: string
  description: string
  status: "active" | "completed"
}

const Page = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.project)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>()

  const onSubmit = (data: ProjectFormData) => {
    dispatch(createProject(data)).then((res) => {
      const response = res.payload
      if (response?.success == true) {
        toast.success("✅ Project Created Successfully")
        reset()
      } else {
        toast.error("❌ Failed to create project")
      }
    })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <GuardRoute />
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          🚀 Create a New Project
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              placeholder="Enter project title..."
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              rows={4}
              placeholder="Enter project description..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register("status", { required: "Status is required" })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm bg-white"
            >
              <option value="">-- Select Status --</option>
              <option value="active">🟢 Active</option>
              <option value="completed">✅ Completed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "✨ Create Project"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
