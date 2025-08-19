'use client'

import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatchHook";
import { loginUser } from "@/lib/redux/actions/authAction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Page = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
   const dispatch = useAppDispatch()
   const { isLoggedIn } = useAppSelector(state=> state.auth)
   const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    dispatch(loginUser(data))
   };
   if(isLoggedIn){
     router.push(`/projects`)
   }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
           <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

           <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

           <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <div>
          <Link href={`/signup`}><span className="text-xl text-blue-400">New User Signup</span></Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
