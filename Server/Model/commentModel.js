import mongoose  from "mongoose";

const commentSchema = new mongoose.Schema( 
    { 
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
        },
        postId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Post",
        },
        comment : String,
    },
    {timestamps:true}
    );

    const commentModel = mongoose.model("Comment",commentSchema);

    export default commentModel