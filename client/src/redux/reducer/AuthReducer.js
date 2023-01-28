const authReducer = (state = { authData: null, loading: false, error: false },
   action) => {
   switch (action.type) {
      case "AUTH_START":
         return { ...state, loading: true, error: false };
      case "AUTH_SUCCESS":
         localStorage.setItem("token", action.data.token)
         localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
         return { ...state, authData: action.data, loading: false, error: false };
      case "AUTH_FAIL":
         return { ...state, loading: false, error: true }

      case "UPDATE_FOLLOWINGS":
         return {
            ...state,
            authData: {
               ...state.authData,
               user: {
                  ...state.authData.user,
                  following: [...state.authData.user.following, action.payload]
               }
            }
         }
      case 'UPDATE_UNFOLLOW':
         return {
            ...state,
            authData: {
               ...state.authData,
               user: {
                  ...state.authData.user,
                  following: [...state.authData.user.following.filter((id) => id !== action.payload)]
               }
            }
         }
      //    case "USER_DATA_SUCCESS":
      //   console.log(action)
      //   return {
      //     ...state.authData.user{ ...action.payload },
      //     loading: false, error: false,  };
      case 'LOGOUT':
         return {
            undefined
         }


      default:
         return state
   }
};



export default authReducer