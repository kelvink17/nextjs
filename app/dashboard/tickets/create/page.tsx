'use client'
import {useState} from "react"
import{useRouter} from "next/navigation"

export default function CreateTicketPage(){
    const router = useRouter()
    const [form,setForm] = useState({
        title: "",
        description: ""
    })
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name,value} = event.target
        setForm({...form, [name]: value})
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const response = await fetch("/api/tickets",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form),
            }
        )
        if(!response.ok){
            throw new Error("Failed to create ticket")
        }
        router.push("/dashboard/tickets")
    }
    return(
    <div className="max-w-xl mx-auto rounded-xl  bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold">Create Ticket</h1>
        <form className="space-y-6 " onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" className="border rounded py-3 px-4 w-full outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" name="title" value={form.title} onChange={handleChange} />
            <textarea placeholder="Description" className="border rounded py-3 px-4 w-full outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 " name="description" value={form.description} onChange={handleChange}></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Create Ticket</button>
        </form>
    </div>
)}