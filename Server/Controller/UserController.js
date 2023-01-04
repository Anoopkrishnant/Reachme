import userModel from "../Model/userModel.js"
import bcrypt from "bcrypt"
import mongoose, { Types } from "mongoose";
import postModel from "../Model/postModel.js";
import { v4 as uuidv4 } from "uuid";


//Get a User 

export const getUser = async (req, res) => {
   const id = req.params.id;
   try {
      const user = await userModel.findById(id).lean();
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }
      const totalPosts = await postModel.find({ userId: user._id }).countDocuments();
      user.totalPosts = totalPosts;
      user.password = undefined;
      res.status(200).json(user);
   } catch (err) {
      console.log(err);
      res.status(500).json("something went wrong");
   }
};

// Update a User

export const updateUser = async (req, res) => {
   const id = req.params.id;

   try {

      const { password } = req.body;

      if (id === req.user.userId) {
         if (password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password, salt);
         }
         const user = await userModel.findByIdAndUpdate(id, req.body, { new: true })

         user.password = undefined;

         res.status(200).json({ user })

      } else {
         res.status(403).json({ message: "Access Denied! You can only update your profile" })
      }
   } catch (error) {

      res.status(500).json({ message: "somthing went wrong" });
   }
};




// Delete User

export const deleteUser = async (req, res) => {
   const id = req.params.id

   const { currentUserId, currentUserAdminStatus } = req.body
   if (currentUserId === id || currentUserAdminStatus) {
      try {
         await userModel.findByIdAndDelete(id)
         res.status(200).json("User Deleted Successfully")
      } catch (error) {
         res.status(500).json(error)
      }
   }
   else {
      res.status(403).json("Access Denied! you can only delte your account")

   }
};

// Get all Users

export const getAllUsers = async (req, res) => {
   try {
      const users = await userModel.find().select({
         password: 0,
         isAdmin: 0,
      });
      console.log(users)
      res.status(200).json(users);

   } catch (err) {
      console.log(err)
      res.status(500).json("something went wrong");
   }
};


// Follow a User

export const followUser = async (req, res) => {
   const id = req.params.id;

   const { currentUserId } = req.body;

   if (currentUserId === id) {
      res.status(403).json("Action Forbidden")
   }
   else {
      try {
         const followUser = await userModel.findById(id)
         const followingUser = await userModel.findById(currentUserId)

         if (!followUser.followers.includes(currentUserId)) {
            const notification = {
               id: uuidv4(),
               title: "New Follower",
               profilePicture: followingUser.profilePicture,
               message: `${followingUser.username} started following you`,
               time: Date.now(),
               link: `/profile/${followingUser._id}`

            };

            await followUser.updateOne({
               $push: {
                  followers: mongoose.Types.ObjectId(currentUserId)
               }
            });
            followUser.notifications.unshift(notification)
            await followUser.save();

            await followingUser.updateOne({
               $push: { following: mongoose.Types.ObjectId(id) }
            });
            res.status(200).json("User Followed !")
         }
         else {
            res.status(403).json("User Already followed by you ")
         }
      } catch (error) {
         console.log(error);
         res.status(500).json(error)
      }
   }
};


// Unfollow a User

export const unfollowUser = async (req, res) => {
   const id = req.params.id;

   const { currentUserId } = req.body;

   if (currentUserId === id) {
      res.status(403).json("Action Forbidden")
   }
   else {
      try {
         const followUser = await userModel.findById(id)
         const followingUser = await userModel.findById(currentUserId)

         if (followUser.followers.includes(currentUserId)) {
            await followUser.updateOne({ $pull: { followers: mongoose.Types.ObjectId(currentUserId) } })
            await followingUser.updateOne({ $pull: { following: mongoose.Types.ObjectId(id) } })
            res.status(200).json("User Unfollowed !")
         }
         else {
            res.status(403).json("User is not followed by you ")
         }
      } catch (error) {
         res.status(500).json(error)
      }
   }
};


// Get All followers

export const getFollowers = async (req, res) => {
   const userId = req.params.id;
   if (!userId) {
      return res.status(401).json({ message: "please provide id" });
   }
   try {
      const followers = await userModel.aggregate([
         {
            $match: { _id: mongoose.Types.ObjectId(userId) },
         },
         {
            $lookup: {
               from: "users",
               localField: "followers",
               foreignField: "_id",
               as: "myFollowers",
            },
         },
         {
            $project: {
               "myFollowers.password": false,
               "myFollowers.isAdmin": false,
               "myFollowers.followers": false,
               "myFollowers.following": false,
               _id: 0,
            },
         },
      ]);
      const myFollowers = followers[0].myFollowers;
      res.status(200).json({ followers: myFollowers });
   } catch (error) {
      res.status(500).json({ message: "something went wrong", error });
   }
};

// Notifications

export const getNotifications = async (req, res) => {
   const  userId  = req.params.id;
   try {
     const notifications = await userModel.findById(userId)
     res.status(200).json(notifications);
   } catch (error) {
      console.log(error)
     res.status(500).json("something went wrong!");
   }
 };


export const clearNotifications = async (req, res) => {
   const { userId } = req.user;
   try {
      await userModel.findByIdAndUpdate(userId,
         {
            notifications: [],
         });
      res.status(200).json({ message: "notification cleared successfully" })
   } catch (error) {
      res.status(500).json({ message: "Somthing went wrong" })
   }
};


// Search users

export const searchUser = async (req, res) => {
   try {
      const keyword = req.query.name || "";
      const users = await userModel.find({
         $or: [
            { username: { $regex: keyword, $options: "i" } },
         ],
      }).select({ username: 1, profilePicture: 1 })
      res.status(200).json(users);
   } catch (error) {
      console.log(error);
   }
};