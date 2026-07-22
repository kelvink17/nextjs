import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Ticket from "@/app/models/Ticket";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/app/lib/logto";
 

export async function GET(request: Request , {params}: {params: Promise<{id: string}>}) {
    await connectDB()
    const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
    if(!isAuthenticated) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    
    const {id} = await params;
    const ticket = await Ticket.findById(id)
     if (ticket.userId !== claims!.sub) {
        return NextResponse.json({error: "Forbidden"}, {status: 403})
    }
    return NextResponse.json(ticket)
}

export async function PUT(request: Request, {params}: {params: Promise<{id: string}>} ){
    await connectDB()
      const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
    if(!isAuthenticated) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    
    const {id} = await params;
    const body = await request.json();
    const ticket = await Ticket.findByIdAndUpdate(id, body, {new : true})
       if (ticket.userId !== claims!.sub) {
        return NextResponse.json({error: "Forbidden"}, {status: 403})
    }
    return NextResponse.json(ticket)
}

export async function DELETE(request: Request,  {params}: {params: Promise<{id: string}>}){
    await connectDB()
      const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
    if(!isAuthenticated) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    
    const {id} = await params;
    const ticket = await Ticket.findByIdAndDelete(id)
       if (ticket.userId !== claims!.sub) {
        return NextResponse.json({error: "Forbidden"}, {status: 403})
    }
    return NextResponse.json(ticket)
}