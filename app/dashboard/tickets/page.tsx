import { cookies } from "next/headers";
import Link from "next/link";
import DeleteButton from "@/app/components/DeleteButton";

interface Ticket {
    _id: string,
    title: string;
    description: string;
}

export default async function tickets(){
  const cookieStore = await cookies()
  const baseUrl = process.env.NEXT_PUBLIC_API_URL 
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const response = await fetch(`${baseUrl}/api/tickets`, {
    headers: {
        Cookie: cookieStore.toString()
    },
    cache: "no-store"
})
    
    if (!response.ok) {
    return (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            Unable to load tickets ({response.status}). Please check your login session.
        </div>
    );
}
    const tickets: Ticket[]= await response.json()
   console.log(tickets)
   console.log(Array.isArray(tickets))

    
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold" >Tickets</h1>
            {tickets.map((ticket)=> ( 
            <div  className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover: shadow-md " key={ticket._id}>
                <h2 className="font-semibold text-xl text-gray-900">{ticket.title}</h2>
                <p className="mt-2 text-sm  leading-6 text-gray-500">{ticket.description}</p>
                <div className="mt-5 flex gap">
                <Link href={`/dashboard/tickets/${ticket._id}/edit`} className=" rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
                    Edit Ticket
                </Link>
                <DeleteButton id= {ticket._id} />
                </div>
            </div>)
            )}
            <div className="mb-6">
                <Link href="/dashboard/tickets/create" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Create Ticket
                </Link>
            </div>
        </div>
    )
}