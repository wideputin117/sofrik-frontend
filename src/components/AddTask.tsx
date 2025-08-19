'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { addTask } from "@/lib/redux/actions/taskAction"
import { manageTask } from "@/lib/redux/slice/taskSlice"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface AddTaskProps {
  projectId: string
  onClose: () => void
}

interface TaskFormData {
  title: string
  description: string
  due_date: string
  status: "todo" | "in-progress" | "done"
}

const AddTask = ({ projectId, onClose }: AddTaskProps) => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>()
  const { isSuccess } = useAppSelector(state=> state.task)
  const onSubmit = (data: TaskFormData) => {
    dispatch(addTask({ ...data, projectId }))
    dispatch(manageTask())
    onClose()  
  
 }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Add Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Task title"
            className="w-full p-2 border rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

          <textarea
            {...register("description")}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />

          <input
            type="date"
            {...register("due_date", { required: "Due date is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.due_date && <p className="text-red-500 text-sm">{errors.due_date.message}</p>}

          <select
            {...register("status", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddTask
