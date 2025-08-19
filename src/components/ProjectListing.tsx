// 'use client'

// import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook"
// import { getProjects } from "@/lib/redux/actions/projectAction"
// import { useEffect, useState } from "react"
// import AddTask from "./AddTask"
// import Link from "next/link"

// export const ProjectListing = () => {
//   const dispatch = useAppDispatch()
//   const { projects, isLoading, paginate } = useAppSelector(state => state.project)
//   const [currentPage, setCurrentPage] = useState<number>(1)
//   const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

//   const handlePageChange = (page: number) => {
//     if (page > 0 && page <= paginate?.totalPages) {
//       setCurrentPage(page)
//     }
//   }

//   useEffect(() => {
//     dispatch(getProjects({ page: currentPage, limit: 10 }))
//   }, [dispatch, currentPage])

//   if (isLoading) {
//     return <span>Loading please wait...</span>
//   }

//   return (
//     <div className="p-4">
//       {projects?.length > 0 ? (
//         <div className="space-y-6">
//           <div className="grid gap-4">
//             {projects.map((project: any) => (
//               <div
//                 key={project._id}
//                 className="border rounded-lg p-4 shadow-sm bg-white"
//               >
//                 <div>
//                 <h2 className="text-lg font-semibold">{project.title}</h2>
//                 <Link href={`/projects/${project?._id}`}>
//                       <button className="text-lg font-semibold">View Details</button>
//                 </Link>
//                  </div>
//                  <p className="text-gray-600">{project.description}</p>
//                 <p className="text-sm text-blue-600">
//                   Status: <span className="font-medium">{project.status}</span>
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   Last updated: {new Date(project.updatedAt).toLocaleString()}
//                 </p>

//                 {project.tasks?.length > 0 && (
//                   <ul className="list-disc pl-6 mt-2 text-sm text-gray-700">
//                     {project.tasks.map((task: any, idx: number) => (
//                       <li key={idx}>{task.title ?? "Untitled Task"}</li>
//                     ))}
//                   </ul>
//                 )}

//                 <button
//                   onClick={() => setSelectedProjectId(project._id)}
//                   className="mt-3 px-3 py-1 text-sm bg-green-600 text-white rounded"
//                 >
//                   + Add Task
//                 </button>
//               </div>
//             ))}
//           </div>

//           {paginate?.totalPages >= 1 && (
//             <div className="flex justify-center items-center gap-2 mt-6">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 Prev
//               </button>

//               {[...Array(paginate.totalPages)].map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => handlePageChange(idx + 1)}
//                   className={`px-3 py-1 border rounded ${
//                     currentPage === idx + 1 ? "bg-blue-500 text-white" : ""
//                   }`}
//                 >
//                   {idx + 1}
//                 </button>
//               ))}

//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === paginate.totalPages}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       ) : (
//         <span>No Projects</span>
//       )}

//        {selectedProjectId && (
//         <AddTask
//           projectId={selectedProjectId}
//           onClose={() => setSelectedProjectId(null)}
//         />
//       )}
//     </div>
//   )
// }
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
    </div>
  )
}
