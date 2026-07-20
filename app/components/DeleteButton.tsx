'use client'

import {useRouter} from "next/navigation"


interface DeleteButtonProps {
    id: string
}

export default function DeleteButton({id} : DeleteButtonProps) {
    const router = useRouter();

    async function handleDelete(){
        const confirmed = window.confirm("Are you sure you want to delete")
        if(!confirmed) return

        const response = await fetch(`/api/tickets/${id}`, {method: "DELETE"})
          if(!response.ok){
            console.log(response.status)
            console.log( await response.text())
            throw new Error("Failed to delete ticket")
        }
        
        router.refresh()
    }

    return (
        <button onClick={handleDelete} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">Delete</button>
    )
}