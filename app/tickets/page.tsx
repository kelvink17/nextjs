import Link from "next/link";

export default function Ticket(){
    return(
        <div>
        <Link href="tickets/1">Ticket 1</Link>
        <Link href="tickets/2">Ticket 2</Link>
        <br />
        <Link  href="tickets/3" >Ticket 3</Link>
        </div>
    )
}