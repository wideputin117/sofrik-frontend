"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { useEffect, useState } from "react"
import { getProjectById } from "@/lib/redux/actions/projectAction"
import TaskList from "./TaskList"
import AddTask from "./AddTask"

const SingleProject = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()
  const { project, isLoading } = useAppSelector((state) => state.project)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)

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
         className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Update Project
      </button>

      <button
        onClick={() => setShowAddTaskModal(true)}
        className="ml-2 mt-3 px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Add Task
      </button>

      <h2 className="mt-6 text-xl font-semibold">Tasks</h2>
      <TaskList projectId={id} />

       {showAddTaskModal && (
        <AddTask projectId={id} onClose={() => setShowAddTaskModal(false)} />
      )}
    </div>
  )
}

export default SingleProject
