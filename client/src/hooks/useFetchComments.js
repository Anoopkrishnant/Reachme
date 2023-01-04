import axios from "axios"
import  { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { fetchComments } from "../api/CommentRequest"
const useFetchComments = (postId) => {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetchComments(postId)
          .then((response) => {
            setComments(response.data);
            setLoading(false);
            setError(false);
          })
          .catch((err) => {
            console.log(err);
            setError(true);
          });
      }, []);

    return  {loading, error, comments, setComments, setLoading }
};

export default useFetchComments;



