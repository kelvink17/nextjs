import { getLogtoContext } from "@logto/next/server-actions"
import { redirect } from "next/navigation"
import { logtoConfig } from "../lib/logto"


export default async function Dashboard(){
    const {isAuthenticated, claims} = await getLogtoContext(logtoConfig)
    if (!isAuthenticated) {
        redirect('/')
    }
    return (
        <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-2 text-gray-500">welcome </p>
        </div>
    )
}