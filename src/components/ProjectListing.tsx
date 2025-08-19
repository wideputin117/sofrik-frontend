'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
import { getProjects } from "@/lib/redux/actions/projectAction"
import { useEffect, useState } from "react"
import AddTask from "./AddTask"
import Link from "next/link"

export const ProjectListing = () => {
  const dispatch = useAppDispatch()
  const { projects, isLoading, paginate } = useAppSelector(state => state.project)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= paginate?.totalPages) {
      setCurrentPage(page)
    }
  }

  useEffect(() => {
    dispatch(getProjects({ page: currentPage, limit: 10 }))
  }, [dispatch, currentPage])

  if (isLoading) {
    return <span>Loading please wait...</span>
  }

  return (
    <div className="p-4">
      {projects?.length > 0 ? (
        <div className="space-y-6">
          <div className="grid gap-4">
            {projects.map((project: any) => (
              <div
                key={project._id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div>
                <h2 className="text-lg font-semibold">{project.title}</h2>
                <Link href={`/projects/${project?._id}`}>
                      <button className="text-lg font-semibold">View Details</button>
                </Link>
                 </div>
                 <p className="text-gray-600">{project.description}</p>
                <p className="text-sm text-blue-600">
                  Status: <span className="font-medium">{project.status}</span>
                </p>
                <p className="text-xs text-gray-400">
                  Last updated: {new Date(project.updatedAt).toLocaleString()}
                </p>

                {project.tasks?.length > 0 && (
                  <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
                    {project.tasks.map((task: any, idx: number) => (
                      <li key={idx}>{task.title ?? "Untitled Task"}</li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={() => setSelectedProjectId(project._id)}
                  className="mt-3 px-3 py-1 text-sm bg-green-600 text-white rounded"
                >
                  + Add Task
                </button>
              </div>
            ))}
          </div>

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
      ) : (
        <span>No Projects</span>
      )}

       {selectedProjectId && (
        <AddTask
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </div>
  )
}
