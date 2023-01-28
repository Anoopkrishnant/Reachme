 import * as PostApi from '../../api/PostRequest';
 import { toast } from "react-hot-toast";
 
// export const getTimelinePosts = (id) => async (dispatch) => {

//     dispatch({ type: "RETREIVING_START" });
//     try {
//         const { data } = await PostApi.getTimelinePosts(id);
//         dispatch({ type: "RETREIVING_SUCCESS", data: data.posts })
//     } catch (error) {
//         dispatch({ type: "RETREIVING_FAIL" });
//     }

// };


export const likePost = (id) => async (dispatch) => {
    dispatch({ type: "LIKE_PENDING" });
    try {
      await PostApi.likePost(id);
      dispatch({ type: "LIKE_SUCCESS"  });
    } catch (error) {
      dispatch({ type: "LIKE_FAIL" });
      console.log(error);
    }
  };


  // export const commentPost = (postComment,postId) => async (dispatch) => {
  //   dispatch({ type: "COMMENT_PENDING" });
  //   try {
  //     const {data} = await PostApi.commentPost(postComment,postId);
      
  //     dispatch({ type: "COMMENT_SUCCESS", data:data });
  //     console.log(data,'😍');
  //      return data.comments;
  //   } catch (error) {
  //     dispatch({ type: "COMMENT_FAIL" });
  //     console.log(error);
  //   }
  // };

  export const deletePost = (id) => async (dispatch) => {
    dispatch({ type: "POST_PENDING" });
    try {
      const response = await PostApi.deletePost(id);
      dispatch({ type: "POST_DELETE_SUCCESS", payload: response.data.id });
      dispatch({ type: "UPDATE_POST_COUNT", payload: -1 });
      //toast
      toast(response.data.message, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      if (err.response?.data?.expired) {
        return dispatch({ type: "LOGOUT" });
      }
      dispatch({ type: "POST_FAIL" });
      console.log(err);
      err.response?.data?.message &&
        toast(err.response.data.message, {
          icon: "😢",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
    }
  };
  
  export const reportPost = (id, type) => async (dispatch) => {
    dispatch({ type: "POST_PENDING" });
    try {
      await PostApi.reportPost(id, type);
      dispatch({ type: "REPORT_POST", payload: id });
      toast("Successfully reported", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (err) {
      dispatch({ type: "POST_FAIL" });
      console.log(err);
      err.response?.data?.message &&
        toast(err.response.data.message, {
          icon: "😢",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
    }
  };
  

