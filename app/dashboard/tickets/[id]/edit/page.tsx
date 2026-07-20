'use client'
import {useState ,useEffect} from "react"
import{useRouter} from "next/navigation"
import { useParams} from "next/navigation"

export default function EditTicketPage(){
    const params = useParams();
    const id = params.id as string
    console.log(id)
    const router = useRouter()

    const [form,setForm] = useState({
        title: "",
        description: ""
    })
    useEffect(() => {
        async function fetchTicket(){
            const response = await fetch(`/api/tickets/${id}`)
            const data = await response.json()
            setForm({
                title: data.title,
                description: data.description
            })
        }
        fetchTicket()

    }, [id])

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name,value} = event.target
        setForm({...form, [name]: value})
    }

     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const response = await fetch(`/api/tickets/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form),
            }
        )
        if(!response.ok){
            throw new Error("Failed to update ticket")
        }
        router.push("/dashboard/tickets")
    }

    return(
    <div className="max-w-xl mx-auto rounded-xl  bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold">Edit Ticket</h1>
        <form className="space-y-6 " onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" className="border rounded py-3 px-4 w-full outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" name="title" value={form.title}   onChange={handleChange}/>
            <textarea placeholder="Description" className="border rounded py-3 px-4 w-full outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 " name="description" value={form.description} onChange={handleChange} ></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Create Ticket</button>
        </form>
    </div>
)}