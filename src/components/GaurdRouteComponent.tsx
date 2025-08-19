'use client'

import { useAppSelector } from "@/lib/hooks/dispatchHook";
import { useRouter } from "next/navigation";

export default function ProtectRoute() {
  const { isLoggedIn } = useAppSelector(state=>state.auth)
  const router = useRouter()
  if(!isLoggedIn){
    router.push(`/login`)
  }
   return null
}
