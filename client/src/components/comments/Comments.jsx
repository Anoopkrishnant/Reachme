import React from "react";
import "./comments.scss"
import useFetchComments from "../../hooks/useFetchComments";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import {deleteComment, postComment} from "../../api/CommentRequest"

const override = {
  display: "block",
  margin: "0 auto",
};

const Comments = ({ postId }) => {
  const [newComment, setNewComment] = useState("");
  const { comments, setComments, loading, setLoading } =
    useFetchComments(postId);

  const handleNewComment = async () => {
    if (newComment.trim().length === 0) return;
    setLoading(true);
    try {
      const response = await postComment(postId, newComment);
      setComments([response.data.comment, ...comments]);
    
    } catch (err) {
      console.log(err);
    }
    setNewComment("");
    setLoading(false);
  };

  const handleDeleteComment = async (commentId) => {
    setLoading(true);
    try {
      await deleteComment(commentId);
      setComments([...comments.filter((comment) => comment._id !== commentId)]);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

    return (
        <div className="comments">
            <div className="write">
                <img src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <input type="text" 
                 value={newComment}
                 placeholder="Write your comment"
                 onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleNewComment}>Send</button>

            </div>
            <ScaleLoader color="#1fb464" cssOverride={override} loading={loading} height={16}/>
            {comments && comments?.map((comment,index) => (

                <div key={index} className="comment">
                    <img src={comment.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + comment.profilePicture : ""}alt="" />
                    <div className="info">
                        <span>{comment.username}</span>
                        <p>{comment.comment}</p>
                    </div>
                    <span className="date">1 hour ago</span>
                </div>
            ))}

        </div>
    )
}

export default Comments
