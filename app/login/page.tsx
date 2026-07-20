'use client'
import {useMutation} from "@tanstack/react-query"
import { loginUser } from "../lib/auth"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginForm, loginSchema } from "../lib/validator"
import { useRouter } from "next/navigation"
import { toast} from "sonner"

export default function Login(){
    const router = useRouter()
    const {register, handleSubmit, formState:{errors},} = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    })
    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
             toast.success("Login sucessfull")
             router.push("/dashboard")
        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })
    const onSubmit = async (data: LoginForm) => {
      loginMutation.mutate(data)
      
    }
    return (
        <div className="min-h-screen bg-slate-100 flex item-center justify-center p-6">
        <div className=" w-full bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-slate-800 text-center">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                 <input type="email" placeholder="Email" {...register("email")} className="w-full border rounded-xl border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2"/>
                  {errors.email && (<p className="text-sm text-red-500 font-medium">{errors.email.message}</p>)}
                  <input type="password" placeholder="Password" {...register("password")} className="w-full border rounded-xl border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2"/>
                  {errors.password && (<p className="text-sm text-red-500 font-medium">{errors.password.message}</p>)}
                  <button type="submit" className="border w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transiton hover:scale-[1.02] hover: shadow-lg" disabled={loginMutation.isPending}>{loginMutation.isPending? "logging in ..." :"Login"}</button>
                  <p className="mt-6 text-center text-sm text-slate-500">Already Have An Account? {" "} <a href="/register" className="font-semibold text-blue-600 hover:underline">register</a></p>
            </form>
        </div>
        </div>
    )
} 
