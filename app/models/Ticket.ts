import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
    {
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true 
    },
},
{timestamps: true}
)

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", TicketSchema)

export default Ticket