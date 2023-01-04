import React from 'react'
import "./post.scss"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Link } from "react-router-dom";
import Comments from '../comments/Comments';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';
import { forwardRef } from 'react';
import Actions from '../Action/Action'

const Post = forwardRef(({ data },ref) => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const [commentOpen, setCommentOpen] = useState(false)

    const [liked, setLiked] = useState(data.likes.includes(user._id))
    const [likes, setLikes] = useState(data.likes.length)
    const [isVisible, setIsVisible] =useState(false)

    const handleLike = () => {
        setLiked((prev) => !prev)
        likePost(data._id, user._id)
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
    }


    return (
        <div ref={ref} className='post'>
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={data.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + data.profilePicture : ""} alt="" />
                        <div className="details">
                            <Link to={`/home/profile/${data.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span>{data.username}</span>
                                <span className="date">1 min ago</span>
                            </Link>

                        </div>
                    </div>
                    <div onClick={() =>
                    setIsVisible((pre) => !pre)}>
                    <MoreHorizOutlinedIcon />
                    </div>

                    {isVisible&& <Actions/>}
                </div>
                <div className="content">
                    <p>{data? data.description : null}</p>
                    <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />
                </div>
                <div className="info">
                    <div className="item" onClick={handleLike}>
                        {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                        {likes} Likes
                    </div>
                    <div className="item " onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        2 Comments
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments comments={data.comments} postId={data._id} />}
            </div>
        </div>
    )
})

export default Post
