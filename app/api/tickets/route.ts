import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Ticket from "@/app/models/Ticket";


export async function GET(){
    await connectDB()
const tickets = await Ticket.find().sort({createdAt: -1,})
    return NextResponse.json(tickets)
}

export async function POST(request: Request){
    const body = await request.json()
    const tickets = await Ticket.create(body)
    return NextResponse.json(tickets, {status: 201})
}
