"use client"

import { useAppSelector } from "@/lib/hooks/dispatchHook"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SideBar = () => {
  const pathname = usePathname()
  const { isLoggedIn } = useAppSelector(state=> state.auth)
  const links = [
    { name: "All Projects", href: "/projects" },
    { name: "Add Project", href: "/projects/add" },
  ]

  if(isLoggedIn){
 
  return (
    <aside className="w-60 min-h-screen bg-gray-900 text-gray-100 flex flex-col shadow-lg">
      <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700">
        Dashboard
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white font-medium"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
  }else{
    return null
  }
  
}

export default SideBar
