export default async function Ticket({params,}:{params: Promise<{id: string}>}){
    const {id} = await params;
    return(
        <div>
            <h1>Ticket:{id}</h1>
        </div>
    )
}