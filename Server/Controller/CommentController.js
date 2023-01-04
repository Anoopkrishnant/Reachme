import mongoose from "mongoose";
import commentModel from "../Model/commentModel.js";
import userModel from "../Model/userModel.js";
import postModel from "../Model/postModel.js";

// Post Comment 
export const postComment = async (req, res) => {
    const  {comment}  = req.body;
    const {userId}=req.user
    const postId = req.params.id;

    try {
        const commentAuthor = await userModel.findById(userId);
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "No post found" })
        }
        const myComment = new commentModel({ userId, postId, comment })
        await myComment.save();
        await userModel.populate(myComment, {
            path: "userId" , select: {
                username: 1,
                profilePicture: 1
            },
        });

        const newComment = {
            ...myComment._doc,
            userId: myComment.userId._id,
            username: myComment.userId.username,
            profilePicture: myComment.userId.profilePicture,
        };
        
        res.status(200).json({message: "Comment Added Successfully",comment:newComment})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Somthing went wrong"})
        }
};

export const getComments = async (req, res) => {
    const postId = req.params.id;
    if (!postId) {
      return res.status(401).json({ message: "post id is required" });
    }
    try {
      const comments = await commentModel.aggregate([
        {
          $match: {
            postId: mongoose.Types.ObjectId(postId),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            postId: 1,
            comment: 1,
            createdAt: 1,
            "author.username": 1,
            "author.profilePicture": 1,
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: ["$$ROOT", "$author"],
            },
          },
        },
        {
          $project: {
            author: 0,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
      res.status(200).json(comments);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    }
  };


  export const deleteComment = async (req, res) => {
    const { userId } = req.body;
    const commentId = req.params.id;
    try {
      const comment = await commentModel.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "comment not found" });
      }
      if (comment.userId.toString() !== userId) {
        return res.status(401).json({ message: "your not authorized" });
      }
      await comment.deleteOne();
      res.status(201).json({ message: "comment deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    }
  };