import postModel from "../Model/postModel.js";
import mongoose from "mongoose";
import userModel from "../Model/userModel.js";
import ReportModel from "../Model/reportModel.js";
import {v4 as uuidv4} from "uuid";


//Create new Post

export const createPost = async (req, res) => {
  req.body.userId = req.user.userId;
  try {
    const post = new postModel(req.body);
    await post.save();
    await userModel.populate(post, {
      path: "userId",
      select: { username: 1, profilePicture: 1 },
    });
    const newPost = {
      ...post._doc,
      userId: post.userId._id,
      username: post.userId.username,
      profilePicture: post.userId.profilePicture,
    };
    res.status(201).json({newPost });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

// Get a Post

export const getPost = async (req, res) => {
  
  const id = req.params.id;

  if (!id) {
    res.status(401).json({ message: "Id is required" });
  }
  try {
    const post = await postModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//Update Post

export const updatePost = async (req, res) => {

  const id = req.params.id;
  const { userId } = req.user;
  const { description } = req.body;

  if (!(id && userId)) {
    res.status(401).json({ message: "all filed are required" });
  }
  try {
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "your not authorized" });
    }
    await post.updateOne({ description });
    res.status(201).json({ message: "Post updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};



// Delete Post

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body

  try {
    const post = await postModel.findById(id)
    if (post.userId.toString() === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted Successfully")
    }
    else {
      res.status(403).json("Action Forbidden")
    }
  } catch (error) {
    res.status(500).json(error)
  }

};


// Like | Dislike Post


export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.user
  if (!id) {
    return res.status(401).json({ message: "post id is required" });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "your not authorized" });
    }
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });

      if (post.userId.toString() !== userId) {
        const notification = {
          id: uuidv4(),
          title: "Like",
          profilePicture: user.profilePicture,
          message: `${user.username} liked your post`,
          time: Date.now(),
          link: `/profile/${user._id}`,
        };
        const postAuthor = await userModel.findById(post.userId);
        postAuthor.notifications.unshift(notification);
        await postAuthor.save();
      }

      // if(post.userId.toString() !==userId) {
      //   const notification ={
      //     id:uuidv4(),
      //     title: "Like",
      //     profilePicture: user.profilePicture,
      //     message: `${user.username} liked your post`,
      //     time: Date.now(),
      //     link: `/profile/${user._id}`

      //   };
      //   const postAuthor = await userModel.findById(post.userId);
      //   postAuthor.notifications.unshift(notification)
      //   await postAuthor.save();
      // }


      res.status(201).json({ message: "Post liked successfully" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(201).json({ message: "Post unlike successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// User Post

export const getUserPosts = async (req, res) => {
  const userId = req.params.id;
  const LIMIT = 5;
  const skip = Number(req?.query?.skip) || 0;
  if (!userId) {
    return res.status(401).json({ message: "please provide userId" });
  }
  try {
    const posts = await userModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          username: 1,
          profilePicture: 1,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "userId",
          as: "posts",
        },
      },
      {
        $unwind: {
          path: "$posts",
        },
      },
      {
        $match: {
          $or: [
            {
              "posts.scheduledDate": {
                $exists: false,
              },
            },
            {
              "posts.scheduledDate": {
                $lt: new Date(),
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$$ROOT", "$posts"],
          },
        },
      },
      {
        $project: {
          posts: 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: LIMIT,
      },
    ]);

    res.status(200).json({ message: "Posts fetched successfully", posts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

// Get Timeline Post

export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  const LIMIT = 5;
  const skip = Number(req.query.skip) || 0;
  try {
    const timelinePosts = await userModel.aggregate([
      {
        '$match': {
          '_id': mongoose.Types.ObjectId(userId)
        }
      }, {
        '$lookup': {
          'from': 'posts',
          'localField': 'following',
          'foreignField': 'userId',
          'as': 'followingPost'
        }
      }, {
        '$project': {
          'followingPost': 1
        }
      }, {
        '$lookup': {
          'from': 'posts',
          'localField': '_id',
          'foreignField': 'userId',
          'as': 'userPost'
        }
      }, {
        '$project': {
          '_id': 0,
          'allPosts': {
            '$concatArrays': [
              '$followingPost', '$userPost'
            ]
          }
        }
      }, {
        '$unwind': {
          'path': '$allPosts'
        }
      }, {
        '$lookup': {
          'from': 'users',
          'localField': 'allPosts.userId',
          'foreignField': '_id',
          'as': 'user'
        }
      }, {
        '$unwind': {
          'path': '$user'
        }
      }, {
        '$project': {
          'allPosts': 1,
          'user.username': 1,
          'user.email': 1,
          'user.profilePicture':1,
        }
      }, {
        '$replaceRoot': {
          'newRoot': {
            '$mergeObjects': [
              '$allPosts', '$user'
            ]
          }
        }
      }, {
        '$sort': {
          'createdAt': -1
        }
      }, {
        '$skip': skip
      }, {
        '$limit': LIMIT
      }
    ]);


    res.status(200).json({ posts: timelinePosts });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "something went wrong", error });
  }
};

export const reportPost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.user;
  const { type, message } = req.body;
  if (!postId) {
    return res.status(401).json({ message: "please provide postId" });
  }
  const isReported = await ReportModel.findOne({ userId, postId });
  if (isReported) {
    return res
      .status(401)
      .json({ message: "You have already reported this post" });
  }
  try {
    const newReport = new ReportModel({
      postId,
      reporter: userId,
      type,
      message,
    });
    await newReport.save();
    res.status(201).json({ message: "post reported successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

