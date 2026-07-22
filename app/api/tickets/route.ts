import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Ticket from "@/app/models/Ticket";
import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/app/lib/logto";



export async function GET(){
    await connectDB()
    const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
    if(!isAuthenticated){
    return NextResponse.json({error: "Unautorized"}, {status: 401})
   }
const tickets = await Ticket.find({ userId: claims!.sub}).sort({createdAt: -1,})
    return NextResponse.json(tickets)
}

export async function POST(request: Request){
     await connectDB()
    const {title, description} = await request.json()
   const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
   if(!isAuthenticated){
    return NextResponse.json({error: "Unautorized"}, {status: 401})
   }
   console.log(claims)
console.log("claims.sub", claims?.sub)
    const tickets = await Ticket.create({
        title,
        description,
        userId: claims!.sub
    })
    console.log("send tck:",tickets)
    return NextResponse.json(tickets, {status: 201})
}
