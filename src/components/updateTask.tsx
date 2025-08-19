"use client"

import { useAppDispatch } from "@/lib/hooks/dispatchHook"
import { updateTask } from "@/lib/redux/actions/taskAction"
import { useForm } from "react-hook-form"

interface UpdateTaskProps {
  task: any
  onClose: () => void
  callBack:()=> void
}

interface TaskFormData {
  title: string
  description: string
  due_date: string
  status: "todo" | "in-progress" | "done"
}

const UpdateTask = ({ task, onClose, callBack}: UpdateTaskProps) => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm<TaskFormData>({
    defaultValues: {
      title: task.title,
      description: task.description,
      due_date: task.due_date?.split("T")[0],
      status: task.status,
    },
  })

  const onSubmit = (data: TaskFormData) => {
    dispatch(updateTask({ taskId: task._id, data }))
    callBack()
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4">Update Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("title", { required: true })} placeholder="Title" className="w-full p-2 border rounded" />
          <textarea {...register("description")} placeholder="Description" className="w-full p-2 border rounded" />
          <input type="date" {...register("due_date", { required: true })} className="w-full p-2 border rounded" />
          <select {...register("status", { required: true })} className="w-full p-2 border rounded">
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTask
