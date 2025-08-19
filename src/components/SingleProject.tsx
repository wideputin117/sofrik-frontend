// "use client"

// import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
// import { useEffect, useState } from "react"
// import { getProjectById } from "@/lib/redux/actions/projectAction"
// import TaskList from "./TaskList"
// import AddTask from "./AddTask"
// import UpdateProjectModal from "./UpdateProject"

// const SingleProject = ({ id }: { id: string }) => {
//   const dispatch = useAppDispatch()
//   const { project, isLoading } = useAppSelector((state) => state.project)
//   const { newTaskAdded } = useAppSelector(state=> state.task)
//   const [showAddTaskModal, setShowAddTaskModal] = useState(false)
//   const [showUpdateModal, setShowUpdateModal] = useState(false)

//   useEffect(() => {
//     if (id) {
//       dispatch(getProjectById(id))
//     }
//   }, [id, dispatch])

//   console.log("the newtask added is", newTaskAdded)
//   if (isLoading) return <p>Loading project...</p>
//   if (!project) return <p>No project found</p>

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">{project?.title}</h1>
//       <p className="text-gray-600">{project?.description}</p>
//       <p className="text-sm">Status: {project?.status}</p>

//       <button
//         onClick={() => setShowUpdateModal(true)}
//         className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
//       >
//         Update Project
//       </button>

//       <button
//         onClick={() => setShowAddTaskModal(true)}
//         className="ml-2 mt-3 px-4 py-2 bg-green-500 text-white rounded-lg"
//       >
//         Add Task
//       </button>

//       <h2 className="mt-6 text-xl font-semibold">Tasks</h2>
//       <TaskList projectId={id} />

//       {showAddTaskModal && (
//         <AddTask projectId={id} onClose={() => setShowAddTaskModal(false)} />
//       )}

//       {showUpdateModal && (
//         <UpdateProjectModal project={project} onClose={() => setShowUpdateModal(false)} />
//       )}
//     </div>
//   )
// }

// export default SingleProject
"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { useEffect, useState } from "react"
import { getProjectById } from "@/lib/redux/actions/projectAction"
import TaskList from "./TaskList"
import AddTask from "./AddTask"
import UpdateProjectModal from "./UpdateProject"

const SingleProject = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch()
  const { project, isLoading } = useAppSelector((state) => state.project)
  const { newTaskAdded } = useAppSelector((state) => state.task)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(getProjectById(id))
    }
  }, [id, dispatch])

  if (isLoading) return <p className="text-gray-500">Loading project...</p>
  if (!project) return <p className="text-red-500">No project found</p>

  return (
    <div className="p-6 space-y-6">
       <div className="bg-white rounded-xl shadow-md p-6 border">
        <h1 className="text-3xl font-bold text-gray-900">
          Project: <span className="text-blue-600">{project?.title}</span>
        </h1>
        <p className="mt-2 text-gray-600">Description: {project?.description}</p>

        <div className="mt-4 flex items-center gap-4">
          <span className="px-3 py-1 text-sm rounded-full bg-gray-100 border text-gray-800">
            Status: <strong>{project?.status}</strong>
          </span>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setShowUpdateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            ✏️ Update Project
          </button>

          <button
            onClick={() => setShowAddTaskModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            ➕ Add Task
          </button>
        </div>
      </div>

       <div className="bg-white rounded-xl shadow p-6 border">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">📋 Tasks</h2>
        <div className="mt-4">
          <TaskList projectId={id} />
        </div>
      </div>

       {showAddTaskModal && (
        <AddTask projectId={id} onClose={() => setShowAddTaskModal(false)} />
      )}
      {showUpdateModal && (
        <UpdateProjectModal
          project={project}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  )
}

export default SingleProject
