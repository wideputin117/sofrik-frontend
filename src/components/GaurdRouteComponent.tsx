'use client'

import { useAppSelector } from "@/lib/hooks/dispatchHook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GuardRoute() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/login");  
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500">Checking authentication...</span>
      </div>
    );
  }

  return null;
}
