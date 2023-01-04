 import * as PostApi from '../../api/PostRequest'
 
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


  export const commentPost = (postComment,postId) => async (dispatch) => {
    dispatch({ type: "COMMENT_PENDING" });
    try {
      const {data} = await PostApi.commentPost(postComment,postId);
      
      dispatch({ type: "COMMENT_SUCCESS", data:data });
      console.log(data,'😍');
       return data.comments;
    } catch (error) {
      dispatch({ type: "COMMENT_FAIL" });
      console.log(error);
    }
  };

