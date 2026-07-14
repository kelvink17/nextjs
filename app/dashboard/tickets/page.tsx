interface Ticket {
    _id: number,
    title: string;
    description: string;
}

export default async function tickets(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`)
    const tickets: Ticket[] = await response.json()
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Tickets</h1>
            {tickets.map((ticket)=> ( 
            <div className="rounded-lg border p-4" key={ticket._id}>
                <h2 className="font-semibold">{ticket.title}</h2>
                <p className="text-gray-500">{ticket.description}</p>
            </div>)
            )}

        </div>
    )
}