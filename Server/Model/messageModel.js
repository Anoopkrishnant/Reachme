  import mongoose from "mongoose";

  const messageSchema = new mongoose.Schema({
     chatId : {
        type:mongoose.Types.ObjectId,
        ref: "Chat",
     },
     senderId : {
        type:mongoose.Types.ObjectId,
        ref: "User",
     },
     text:{
        type: String,
     },
  },

  {timestamps:true,}

  );
  const MessageModel = mongoose.model("Message", messageSchema)
  export default MessageModel