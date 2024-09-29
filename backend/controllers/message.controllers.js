import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"
export const sendMessage = async (req,res)=>{
try {
    const {message}=req.body;
    const {id: receiverId}=req.params;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
        participant:{$all:[senderId,receiverId]}
    })
    if(!conversation){
        conversation=await Conversation.create({
        participant:[senderId,receiverId],
        })
    }
    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    });
    if(newMessage){
        conversation.messages.push(newMessage._id);
    }
    //SOCKET IO functionality will go here .
    // await conversation.save();
    // await newMessage.save();
    //this will run parallely.
    await Promise.all([conversation.save(),newMessage.save()])
    res.status(201).json(newMessage);

} catch (error) {
    res.status(500).json({error:"Internal Server Error"});
}
};
export const getMessage = async (req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participant:{$all:[senderId,userToChatId]},
        }).populate("messages");
        if(!conversation)return res.status(200).json([]);
        const messages =conversation.messages;
        res.status(200).json(messages);
    } catch (error)
    {
      console.log("Error in getMessages controller:",error.message);
      res.status(500).json({error:"Internal server error"});
    }
};