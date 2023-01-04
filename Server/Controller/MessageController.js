import MessageModel from "../Model/messageModel.js";

 export const addMessage = async (req, res) => {
    const {chatId, text} = req.body 
    const { userId } = req.user;
    if (!(chatId && text)) {
        return res.status(401).json({message: "All feilds are required"})
    }

    try {
        const message = new MessageModel({
            senderId: userId,
            chatId,
            text,
        });
        await message.save();
        res.status(200).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Somthing went wrong"})
    }
 };

 export const getMessages = async (req, res) => {
    const {chatId} = req.params;
    try {
        const result = await MessageModel.find({ chatId });
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Somthing went wrong"})
    }
 };