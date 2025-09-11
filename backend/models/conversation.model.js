import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participant: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        }
    ],
    status: {
        type: String,
        enum: ["pending", "accepted", "blocked"],
        default: "pending"
    },
    initiator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    blockedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }
}, { timestamps: true }); 

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;






// import mongoose from "mongoose";
// const conversationSchema = new mongoose.Schema({
//     participant:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"User",
//         }
//     ],
//     messages:[
//         {
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"Message",
//             default:[],
//         }
//     ]
// },{timestamp:true});
// const Conversation = mongoose.model("Conversation", conversationSchema);
// export default Conversation;