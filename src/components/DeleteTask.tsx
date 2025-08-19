"use client"

import { useAppDispatch } from "@/lib/hooks/dispatchHook"
import { deleteTask } from "@/lib/redux/actions/taskAction"

interface ConfirmDeleteTaskProps {
  taskId: string
  onClose: () => void
  callBack:()=>void
}

const ConfirmDeleteTask = ({ taskId, onClose, callBack }: ConfirmDeleteTaskProps) => {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteTask(taskId))
    callBack()
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center">
        <h2 className="text-lg font-semibold mb-4">Delete Task?</h2>
        <p className="mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteTask
