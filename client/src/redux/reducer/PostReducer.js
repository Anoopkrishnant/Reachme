const postReducer = (
    state = { posts: [], loading: false, error: false, uploading: false },
    action
) => {
    switch (action.type) {
        case "UPLOAD_START":
            return { ...state, uploading: true, error: false }
        case "UPLOAD_SUCCESS":
            return {
                ...state, posts: [action.data, ...state.posts],
                uploading: false, error: false
            }
        case "UPLOAD_FAIL":
            return { ...state, uploading: false, error: true }

        case 'RETREIVING_SUCCESS':
            return {
                ...state,
                posts: action.data,
                loading: false,
                error: false
            } 
            // return all the other posts normally...
            // change the post that just recived a comment.
            case "COMMENT_SUCCESS":
                return {...state, posts: state.posts.map((post)=>{
                    if(post._id === action.data._id) return action.data;
                    return post;
                })}
        default:
            return state
    }
}

export default postReducer