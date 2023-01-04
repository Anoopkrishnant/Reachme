import React, { useEffect, useState } from 'react'
import "./rightBar.scss"
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from "../../api/UserRequest";
import { followUser, unFollowUser } from '../../api/FollowRequest';





function RightBar() {

    const { user } = useSelector((state) => state.authReducer.authData)
    const dispatch = useDispatch()


    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await getAllUsers();
            const filterdUser=data.filter(item=>item._id!==user._id)
            setUsers(filterdUser);
        };
        fetchUsers();
    }, []);



    const myFollowing = useSelector(
        (state) => state.authReducer.authData.user.following
    );
    const handleFollow = async (id) => {
        try {
            await followUser(user._id, id);
            dispatch({ type: 'UPDATE_FOLLOWINGS', payload: id })

        } catch (error) {
            console.log(error);
        }
    };
    const handleUnFollow = async (id) => {
        try {
            await unFollowUser(user._id, id);
            dispatch({ type: "UPDATE_UNFOLLOW", payload: id });
        } catch (error) {
            console.log(error);
        }
    };
     

    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span>Suggestions For You</span>
                    {users?.map((user) => <div key={user._id} className="user">
                        <div className="userInfo">
                            <img src={user.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture : ""} alt="" />
                            <span>{user.username}</span>
                        </div>
                        <div className="buttons">
                            {!myFollowing.includes(user._id) && <button onClick={() => handleFollow(user._id)}>Follow</button>}
                            {myFollowing.includes(user._id) && <button onClick={() => handleUnFollow(user._id)}>Following</button>}
                            <button>Cancel</button>
                        </div>
                    </div>)}

                </div>
                <div className="item">
                    <span>Latest Activities</span>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/2112735/pexels-photo-2112735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <p>
                                <span>Nandhu </span>
                                Changed their cover picture
                            </p>
                        </div>
                        <span> 1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/10895245/pexels-photo-10895245.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                            <p>
                                <span>Shaloof </span>
                                Uploaded a new post
                            </p>
                        </div>
                        <span> 1 min ago</span>
                    </div>
                    <div className="user">
                        <div className="userInfo">
                            <img src="https://images.pexels.com/photos/4668739/pexels-photo-4668739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <p>
                                <span>Javad Ali </span>
                                Changed their Profile picture
                            </p>
                        </div>
                        <span> 1 min ago</span>
                    </div>
                </div>

                <div className="item">
                    <span>Online Friends</span>
                    {/* <div className="chat-list">
                        {chats.map((chat) => (
                            <div>
                                <Online data={chat} currentUserId = {user._id} />
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default RightBar