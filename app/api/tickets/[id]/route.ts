import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Ticket from "@/app/models/Ticket";
 

export async function GET(request: Request , {params}: {params: Promise<{id: string}>}) {
    await connectDB()
    const {id} = await params;
    const ticket = await Ticket.findById(id)
    return NextResponse.json(ticket)
}

export async function PUT(request: Request, {params}: {params: Promise<{id: string}>} ){
    await connectDB()
    const {id} = await params;
    const body = await request.json();
    const ticket = await Ticket.findByIdAndUpdate(id, body, {new : true})
    return NextResponse.json(ticket)
}

export async function DELETE(request: Request,  {params}: {params: Promise<{id: string}>}){
    await connectDB()
    const {id} = await params;
    const ticket = await Ticket.findByIdAndDelete(id)
    return NextResponse.json(ticket)
}