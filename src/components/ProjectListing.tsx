'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { deleteProject, getProjects } from "@/lib/redux/actions/projectAction"
import { useEffect, useState } from "react"
import AddTask from "./AddTask"
import Link from "next/link"

export const ProjectListing = () => {
  const dispatch = useAppDispatch()
  const { projects, isLoading, paginate } = useAppSelector(state => state.project)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null) // modal state

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= paginate?.totalPages) {
      setCurrentPage(page)
    }
  }

  useEffect(() => {
    dispatch(getProjects({ page: currentPage, limit: 10 }))
  }, [dispatch, currentPage])

  const handleDelete = async () => {
    if (deleteProjectId) {
      await dispatch(deleteProject(deleteProjectId))
      await dispatch(getProjects({ page: currentPage, limit: 10 }))
      setDeleteProjectId(null)
    }
  }

  if (isLoading) {
    return <span className="text-gray-500">Loading please wait...</span>
  }

  return (
    <div className="p-6 space-y-6">
      {projects?.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <div key={project._id} className="bg-white border rounded-xl shadow-md p-5 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Project: <span className="text-blue-600">{project.title}</span>
                </h2>
                <p className="mt-2 text-gray-600">{project.description}</p>

                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 border text-gray-800">
                    Status: <strong>{project.status}</strong>
                  </span>
                  <span className="px-2 py-1 text-xs text-gray-400">
                    Last updated: {new Date(project.updatedAt).toLocaleString()}
                  </span>
                </div>

               {project?.tasks?.length >= 1 && (
                  <ul className="list-disc pl-5 mt-3 text-sm text-gray-700 space-y-1">
                    {project.tasks.slice(0, 3).map((task: any, idx: number) => (
                      <li key={idx}>{task?.title ?? "Untitled Task"}</li>
                    ))}
                    {project.tasks.length > 3 && (
                      <li className="text-gray-500">
                        +{project.tasks.length - 3} more...
                      </li>
                    )}
                  </ul>
                )}
              </div>

              <div className="mt-4 flex gap-2 flex-wrap">
                <Link href={`/projects/${project?._id}`}>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
                    View Details
                  </button>
                </Link>
                <button
                  onClick={() => setSelectedProjectId(project?._id)}
                  className="px-3 py-1 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
                >
                  + Add Task
                </button>
                <button
                  onClick={() => setDeleteProjectId(project?._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded shadow hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className="text-gray-500">No Projects</span>
      )}

       {paginate?.totalPages >= 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
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

       {selectedProjectId && (
        <AddTask
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteProjectId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setDeleteProjectId(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
