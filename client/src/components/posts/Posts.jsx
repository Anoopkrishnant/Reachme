import React, { useCallback, useRef, useState } from 'react'
import Post from '../post/Post'
import {useSelector } from 'react-redux'
import "./posts.scss"
import { useEffect } from 'react'
import HashLoader from "react-spinners/HashLoader"
import { useLocation, useParams } from 'react-router-dom'
import useFetchPosts from '../../hooks/useFetchPosts'
const override = {
  display: "block",
  margin: "0 auto",
};

const Posts = () => {

 
  const [isTimeline, setIsTimeline] = useState(true);
  const [skip, setSkip] = useState(0);
  const location = useLocation();
  const params = useParams();
  // const{ posts} = useSelector((state) => state.postReducer)
  const { loading, hasMore,posts } = useFetchPosts(
    params.id,
    isTimeline,
    skip,
    location,
  );

  const observer = useRef(null);

  // useEffect(() => {
  //   dispatch(getTimelinePosts(user._id))
    
  // },[])

  
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setSkip((pre) => pre + 5);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setSkip(0);
    if (location.pathname === "/home") {
      setIsTimeline(true);
    } else {
      setIsTimeline(false);
    }
  }, [location]);


  return (
  <div className='posts'>
      {posts?.map((post, index) =>{
        if(posts.length === index + 1){
          return<Post ref = {lastPostRef} key = {post._id} data = {post} />
        }
        return <Post key={post._id} data={post} />
     })}
       <HashLoader color="#1fb464" cssOverride={override} loading= {loading} />
    </div>
  
  )
}

export default Posts

