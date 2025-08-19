"use client"

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { getTasksByProject } from "@/lib/redux/actions/taskAction"
import { useEffect, useState } from "react"
import UpdateTask from "./updateTask"
import ConfirmDeleteTask from "./DeleteTask"
import { removeNewTaskAdded } from "@/lib/redux/slice/taskSlice"

const TaskList = ({ projectId }: { projectId: string }) => {
  const dispatch = useAppDispatch()
  const { tasks, isLoading,paginate, newTaskAdded } = useAppSelector(state => state.task)
  const [status, setStatus] = useState<string | "">("")
  const [selectedTask, setSelectedTask] = useState<any | null>(null)
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [callAgain,setCallAgain]= useState<boolean>(false)  


  const handlePageChange = (page: number) => {
    if (page > 0 && page <= paginate?.totalPages) {
      setCurrentPage(page)
    }
  }

  useEffect(() => {
    dispatch(getTasksByProject({ projectId, status: status || undefined, page:currentPage,limit:1 }))
  }, [projectId, status, dispatch,currentPage])

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value)
  }
  
  if(callAgain){
    dispatch(getTasksByProject({ projectId, status: status || undefined, page:currentPage,limit:1 }))
    setCallAgain(false)
  }
  if(newTaskAdded){
    dispatch(getTasksByProject({ projectId, status: status || undefined, page:currentPage,limit:1 }))
    dispatch(removeNewTaskAdded())
  }
  return (
    <div className="p-4 border rounded-md">
      <div className="mb-4 flex items-center gap-3">
        <label htmlFor="status" className="font-medium">Filter by Status:</label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
          className="border rounded px-2 py-1"
        >
          <option value="">All</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {isLoading && <p>Loading tasks...</p>}
      {tasks?.length === 0 && !isLoading && <p>No tasks found.</p>}

      <ul className="space-y-2">
        {tasks?.map((task: any) => (
          <li key={task._id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-500">Status: {task.status}</p>
              <p className="text-xs text-gray-500">Due: {task.due_date?.split("T")[0]}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTask(task)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Update
              </button>
              <button
                onClick={() => setDeleteTaskId(task._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

       {selectedTask && (
        <UpdateTask task={selectedTask} onClose={() => setSelectedTask(null)} callBack={()=> setCallAgain(true)} />
      )}

       {deleteTaskId && (
        <ConfirmDeleteTask taskId={deleteTaskId} onClose={() => setDeleteTaskId(null)} callBack={()=> setCallAgain(true)} />
      )}


      {/** paginate */}
      
          {paginate?.totalPages >= 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {[...Array(paginate.totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageChange(idx + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === idx + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === paginate.totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
    </div>
  )
}

export default TaskList
