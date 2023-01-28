import React from 'react'
import "./leftBar.scss"
import Friends from '../../assets/1.png'
import Groups from '../../assets/2.png'
import Events from '../../assets/3.jpg'
import Memories from '../../assets/4.png'
import Gallery from '../../assets/5.png'
import Messages from '../../assets/6.png'
import Videos from '../../assets/7.png'
import Games from '../../assets/8.png'
import Watch from '../../assets/9.png'
import Post from '../../assets/10.png'
import Settings from '../../assets/11.png'
// import MarketPlace from '../../assets/12.png'
import Profile from '../../assets/13.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';



const LeftBar = () => {

    const { user } = useSelector((state) => state.authReducer.authData)
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const params = useParams();
    let User = false;
    if (!params.id || params.id === user._id) {
        User = true;
    }

    const handleLogout=()=>{
        dispatch({type:"LOGOUT"})
    }

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        {User && (
                        <img src={user.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture : ""} alt="" />
                        )}

                        {User && ( <span>{user.username}</span>  )}
                    </div>
                    <div className="item">
                        <img src={Friends} alt="" />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <img src={Groups} alt="" />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src={Watch} alt="" />
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src={Memories} alt="" />
                        <span>Memories</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Your Shortcuts</span>
                    <div className="item">
                        <img src={Events} alt="" />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={Games} alt="" />
                        <span>Gameing</span>
                    </div>

                    <div className="item">
                        <img src={Gallery} alt="" />
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <img src={Messages} alt="" />
                        <span onClick={()=>navigate('/chat')} style={{cursor:"pointer"}}>Messages</span>
                    </div>
                    <div className="item">
                        <img src={Videos} alt="" />
                        <span>Videos</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>

                    <div className="item">
                        <img src={Profile} alt="" />
                        <span><Link className='pro' to={`/home/profile/${user._id}`}>Profile</Link></span>
                    </div>
                    <div className="item">
                        <img src={Post} alt="" />
                        <span>Post</span>
                    </div>
                    {/* <div className="item">
                        <img src={MarketPlace} alt="" />
                        <span>MarketPlace</span>
                    </div> */}
                    <div className="item" onClick={handleLogout}>
                        <img src={Settings} alt="" />
                        <span >Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar