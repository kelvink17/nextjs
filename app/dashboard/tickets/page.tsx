import Link from "next/link";
import DeleteButton from "@/app/components/DeleteButton";
import { connectDB } from "@/app/lib/mongodb";
import Ticket from "@/app/models/Ticket";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/app/lib/logto";

interface TicketType {
    _id: string;
    title: string;
    description: string;
}

export default async function tickets() {
    // 1. Connect to Database & Get User Claims
    await connectDB();
    const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);

    if (!isAuthenticated) {
        throw new Error("Unauthorized access");
    }

    // 2. Fetch Tickets directly from MongoDB
    const rawTickets = await Ticket.find({ userId: claims!.sub }).sort({ createdAt: -1 });
    
    // Convert Mongoose documents to plain JavaScript objects
    const tickets: TicketType[] = JSON.parse(JSON.stringify(rawTickets));

    // 3. Render UI (Same JSX as before)
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Tickets</h1>
            {tickets.map((ticket) => ( 
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md" key={ticket._id}>
                    <h2 className="font-semibold text-xl text-gray-900">{ticket.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-gray-500">{ticket.description}</p>
                    <div className="mt-5 flex gap-2">
                        <Link href={`/dashboard/tickets/${ticket._id}/edit`} className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
                            Edit Ticket
                        </Link>
                        <DeleteButton id={ticket._id} />
                    </div>
                </div>
            ))}
            <div className="mb-6">
                <Link href="/dashboard/tickets/create" className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Create Ticket
                </Link>
            </div>
        </div>
    );
}