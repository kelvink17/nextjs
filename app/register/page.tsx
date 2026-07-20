'use client'
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterForm, registerSchema } from "../lib/validator"
import {useMutation} from "@tanstack/react-query"
import { registerUser } from "../lib/auth"
import { useRouter } from "next/navigation"
import { toast} from "sonner"


export default function Register(){
    const router = useRouter()
    const {register, handleSubmit, formState:{errors},} = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema)
    })
    const registerUserMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success("Account created sucessfully")
            router.push("/dashboard")

        },
        onError: (error: Error) => {
            toast.error(error.message)
        }
    })
    const onSubmit = async (data: RegisterForm) => {
      registerUserMutation.mutate(data)
      
    }
    return (
        <div className="min-h-screen bg-slate-100 flex item-center justify-center p-6">
        <div className=" w-full bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
            <p className="mt-2 text-slate-800"> Create your account to continue </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                <input type="text" placeholder="Name" {...register("name")} className="w-full border rounded-xl border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2"/>
                {errors.name && (<p className="text-sm text-red-500 font-medium">{errors.name.message}</p>)}
                 <input type="email" placeholder="Email" {...register("email")} className="w-full border rounded-xl border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2"/>
                  {errors.email && (<p className="text-sm text-red-500 font-medium">{errors.email.message}</p>)}
                  <input type="password" placeholder="Password" {...register("password")} className="w-full border rounded-xl border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2"/>
                  {errors.password && (<p className="text-sm text-red-500 font-medium">{errors.password.message}</p>)}
                  <button type="submit" className="border w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transiton hover:scale-[1.02] hover: shadow-lg" disabled={registerUserMutation.isPending}>{registerUserMutation.isPending? "Creating Account...." : "Register"}</button>
                  <p className="mt-6 text-center text-sm text-slate-500">Already Have An Account? {" "} <a href="/login" className="font-semibold text-blue-600 hover:underline">Login</a></p>
            </form>
        </div>
        </div>
    )
} 
