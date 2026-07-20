import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/app/lib/validator";



export async function POST(request: Request){
    console.log("api start")
    await connectDB()
    const body = await request.json()
    const result = registerSchema.safeParse(body)
    if (!result.success) {
        return NextResponse.json(
            {error: result.error.flatten()},
            {status:400}
        )
    }
    const exsitingUser = await User.findOne({
        email: body.email
    })

    if(exsitingUser){
        return NextResponse.json(
            {error: "User already exsist"},
            {status: 409}
        )
    }
    const hashedPassword = await bcrypt.hash(body.password, 20)

    const user = await User.create({
        name: body.name,
        email: body.email, 
        password: hashedPassword
    })

    return NextResponse.json(
        {
            message: "User created succesfully", 
            user:{id: user._id, name: user.name, email: user.email}
        },
            {status:201}
    )
}