"use client"

import { useForm } from "react-hook-form"
import { useAppDispatch } from "@/lib/hooks/dispatchHook"
import { getProjectById, updateProject } from "@/lib/redux/actions/projectAction"
import { Project } from "@/lib/redux/slice/projectSlice"
import { useState } from "react"

interface Props {
  project: Project
  onClose: () => void
}

const UpdateProjectModal = ({ project, onClose }: Props) => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm<Partial<Project>>({
    defaultValues: {
      _id: project._id,
      title: project.title,
      description: project.description,
      status: project.status,
    },
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: Partial<Project>) => {
    setLoading(true)
    await dispatch(updateProject(data))
    await dispatch(getProjectById(project?._id))
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Project</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="mb-3">
            <label className="block text-sm mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="block text-sm mb-1">Description</label>
            <textarea
              {...register("description")}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Status */}
          <div className="mb-3">
            <label className="block text-sm mb-1">Status</label>
            <select
              {...register("status")}
              className="w-full border rounded-lg p-2"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProjectModal
