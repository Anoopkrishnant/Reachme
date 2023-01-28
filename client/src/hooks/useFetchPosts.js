import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const useFetchPosts = (id, isTimeline, skip, location) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.authData.user._id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    setPosts([])
  }, [id, isTimeline, location]);

  const url = isTimeline ? `process.env.REACT_APP_BASE_URL/post/${userId}/timeline` : `process.env.REACT_APP_BASE_URL/post/user/${id}`;

  useEffect(() => {
    const token=localStorage.getItem("token")
    setLoading(true);
    setError(false);
    axios({
      method: "GET",
      url: url,
      params: { skip: skip },
      headers:{
        Authorization:`Bearer ${token}`
      }

    })
      .then((response) => {
        setPosts([...posts, ...response.data.posts])
        setHasMore(response.data.posts.length > 0);
        setLoading(false);
      })
      .catch((err) => {

        // }
        console.log(err);
        setError(true);
      });

    //cleanup function

  }, [id, skip, isTimeline, location]);

  return { loading, error, hasMore, posts };
};

export default useFetchPosts;