"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({children}:{children: React.ReactNode}){
    const pathname =  usePathname()
    return(
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-64 border-r p-6 bg-slate-900 text-white">
                <h2 className="text-xl mb-6 font-bold"> Marklite Dashboard</h2>
                <nav className="flex flex-col gap-4">
                    <Link className={pathname === "/dashboard"? "text-blue-400": ""} href="/dashboard">Home</Link>
                    <Link className={pathname === "/dashboard/tickets" ? "text-blue-400": ""} href="/dashboard/tickets">Ticket</Link>
                    <Link className={pathname === "/dashboard/settings" ? "text-blue-400": ""} href="/dashboard/settings">Settings</Link>
                </nav>
            </aside>
            <main className="flex-1 p-8">{children}</main>
        </div>
    )
}