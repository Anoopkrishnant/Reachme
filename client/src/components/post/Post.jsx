import React, { useEffect, useRef } from 'react'
import "./post.scss"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Link } from "react-router-dom";
import Comments from '../comments/Comments';
import useComponentVisible from "../../hooks/useComponentVisible";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { editPost, likePost } from '../../api/PostRequest';
import { forwardRef } from 'react';
import Actions from '../Action/Action'

const Post = forwardRef(({ data }, ref) => {
    const { user } = useSelector((state) => state.authReducer.authData)
    const [commentOpen, setCommentOpen] = useState(false)
    const [showEdit, setShowEdit] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { dropdownRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const [caption, setCaption] = useState(data.description)

    const [liked, setLiked] = useState(data.likes.includes(user._id))
    const [likes, setLikes] = useState(data.likes.length)

    const editRef = useRef();
    const handleLike = () => {
        setLiked((prev) => !prev)
        likePost(data._id, user._id)
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
    }

    const handleSubmitEdit = async () => {
        const newCaption = editRef.current.value;
        const postId = data._id;
        if (newCaption.trim().length === 0) return;
        try {
          await editPost(postId, newCaption);
          setCaption(newCaption);
        } catch (err) {
          console.log(err);
        }
        setShowEdit(false);
      };
    
      useEffect(() => {
        if (showEdit) {
          editRef.current.focus();
        }
      }, [showEdit]);


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
                    <div className='more-options'>
                        <div onClick={() => setIsComponentVisible(true)}>
                            <MoreHorizOutlinedIcon />
                        </div>
                        {isComponentVisible && (
                            <Actions
                                ref={dropdownRef}
                                userId={data?.userId}
                                postId={data?._id}
                                openReportModal={() => setOpenModal((pre) => !pre)}
                                onEdit={() => setShowEdit(true)}
                            />
                        )}
                    </div>
                </div>
                <div className="content">
                    <p>{data ? data.description : null}</p>
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
