import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/app/lib/validator";


export async function POST(request: Request){
    await connectDB()
    const body = await request.json()
    const result = loginSchema.safeParse(body)

    if(!result.success){
        return NextResponse.json(
            {error: result.error.flatten()},
            {status:400}
        )
    }
    const user = await User.findOne({
        email: body.email
    })

    if(!user){
        return NextResponse.json(
            {error: "Invalid email and password"},
            {status:401}
        )
    }
    const isPasswordCorrect = await bcrypt.compare(
        body.password,
        user.password
    )

    if (!isPasswordCorrect) {
         return NextResponse.json(
            {error: "Invalid email and password"},
            {status:401}
        )
    }
    
    return NextResponse.json(
                {message: "Login successfull"},
                {status:200}
            )
}