"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { useEffect } from "react"
import {
  getProjectById,
  } from "@/lib/redux/actions/projectAction"
import { addTask } from "@/lib/redux/actions/taskAction"

const SingleProject = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()
  const { project, isLoading } = useAppSelector((state) => state.project)

  useEffect(() => {
    if (id) {
      dispatch(getProjectById(id))
    }
  }, [id, dispatch])

  if (isLoading) return <p>Loading project...</p>
  if (!project) return <p>No project found</p>

  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p className="text-gray-600">{project.description}</p>
      <p className="text-sm">Status: {project.status}</p>

      <button
        // onClick={handleUpdateProject}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Update Project
      </button>

      <button
        // onClick={handleAddTask}
        className="ml-2 mt-3 px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Add Task
      </button>

      <h2 className="mt-6 text-xl font-semibold">Tasks</h2>
      <ul className="mt-3 space-y-2">
        {project?.tasks?.map((task: any) => (
          <li
            key={task._id}
            className="flex justify-between items-center border p-3 rounded-md"
          >
            <div>
              <p className="font-medium">{task?.title}</p>
              <p className="text-sm text-gray-500">{task?.description}</p>
              <p className="text-xs">Status: {task?.status}</p>
              <p className="text-xs">Due: {task?.due_date?.split("T")[0]}</p>
            </div>
            <div className="flex gap-2">
              <button
                // onClick={() => handleUpdateTask(task._id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded-md"
              >
                Update
              </button>
              <button
                // onClick={() => handleDeleteTask(task._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SingleProject
