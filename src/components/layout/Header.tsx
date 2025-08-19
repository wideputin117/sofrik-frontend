"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { logout } from "@/lib/redux/slice/authSlice";
import { useRouter } from "next/navigation";

const Header = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector(state=> state.auth)
  const router = useRouter()
  const handleLogout = () => {
    console.log("logging out")
    if(isLoggedIn){
    dispatch(logout())
    }else{
       router.push(`/login`)
    };
  };
 
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl border-b border-slate-700/50 backdrop-blur-sm">
       <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-sm font-bold text-white">M</span>
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          My App
        </h1>
      </div>

       <div className="flex items-center space-x-4">
         <div className="hidden sm:flex items-center space-x-2 text-slate-300">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm">Online</span>
        </div>
        
         <button
          onClick={handleLogout}
          className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          <span className="flex items-center space-x-2">
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
            <span>{isLoggedIn ? 'Logout':'Login'}</span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;