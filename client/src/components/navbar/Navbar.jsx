import React, { useContext, useEffect } from 'react'
import "./navBar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import Modal from '../postModal/PostModal';
import { useDispatch, useSelector } from 'react-redux';
import Notifications from '../Notification/Notifications'
import { getNotifications } from '../../redux/actions/UserAction';
import useComponentVisible from '../../hooks/useComponentVisible';

function Navbar() {

  const {toggle, darkMode} = useContext(DarkModeContext);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  const { notifications } = useSelector((state) => state.userReducer);
  const { dropdownRef, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);




  useEffect(() => {
    dispatch(getNotifications());
  }, [location]);

  return (
    <div className="navbar">
        <div className="left">
            <Link to="/" style={{textDecoration: "none"}}>
            <span>Reach</span><span style={{color: "#14da8f" }}>Me</span>
            </Link>
            <Link className='Homelink' to="/home"  >
            <HomeOutlinedIcon />
            </Link>
            {darkMode ? <WbSunnyOutlinedIcon  onClick={toggle} /> : <DarkModeOutlinedIcon onClick={toggle} /> }
            <Modal />
            {/* <AddAPhotoRoundedIcon /> */}
          
            <div className="search">
                <SearchOutlinedIcon />
                <input type="text" placeholder='Search...' />
            </div>
        </div>
        <div className="right">
            <PersonOutlineOutlinedIcon />
            <EmailOutlinedIcon onClick={()=>navigate('/chat')} sx={{cursor:"pointer"}} />
            <div className='notification'>
            <NotificationsOutlinedIcon  onClick={() => setIsComponentVisible(true)} />
            {/* { notifications.length > 0 && <span>{notifications.length}</span>} */}
        {isComponentVisible && notifications.length > 0 && (
          <Notifications ref={dropdownRef} notifications={notifications} />
        )}
             </div>
            <div className="user">
               {/* <img src={} /> 
               <span>{currentUser.name}</span> */}
            </div>
        </div>
    </div>
  )
}

export default Navbar