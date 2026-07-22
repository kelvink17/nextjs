"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationLinks() {
    const pathname = usePathname();
    
    return (
        <nav className="flex flex-col gap-4">
            <Link className={pathname === "/dashboard" ? "text-blue-400" : ""} href="/dashboard">Home</Link>
            <Link className={pathname === "/dashboard/tickets" ? "text-blue-400" : ""} href="/dashboard/tickets">Ticket</Link>
            <Link className={pathname === "/dashboard/settings" ? "text-blue-400" : ""} href="/dashboard/settings">Settings</Link>
            <Link className={pathname === "/" ? "text-blue-400" : ""} href="/"><button className="bg-red-600 rounded-lg">Logout</button></Link>
        </nav>
    );
}
