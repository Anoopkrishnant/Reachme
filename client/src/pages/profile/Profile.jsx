import React, { useEffect, useRef, useState, } from 'react'
import "./profile.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Posts from "../../components/posts/Posts"
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, updateProfile } from '../../redux/actions/UserAction';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadImage } from '../../api/UploadRequest';
import ProfileModal from "../../components/profileModal/ProfileModal"
import { createRoom } from "../../api/ChatRequest"



const Profile = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { userDetails } = useSelector((state) => state.userReducer);
  const params = useParams();
  const profilePicRef = useRef()
  const coverPicRef = useRef()
  const dispatch = useDispatch();
  const [modalOpened, setModalOpened] = useState(false);
  const navigate = useNavigate();

  let User = false;
  if (!params.id || params.id === user._id) {
    User = true;
  }

  useEffect(() => {

    if (params.id) {
      const userId = params.id;
      dispatch(getUserDetails(userId));
    }
  }, [dispatch, params.id, user._id]);
  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      const name = e.target.name;
      const data = new FormData();
      const fileName = Date.now() + img.name;
      data.append("name", fileName);
      data.append("file", img);
      const userDetails = {
        [name]: fileName,
      };
      try {
        await uploadImage(data);
        console.log(userDetails, 'userDetails');
        dispatch(updateProfile(user._id, userDetails));
      } catch (err) {
        console.log(err);
      }
    }
  };

  //creating new chatroom with the user
  const handleNewChatRoom = async () => {
    try {
      const memberId = userDetails._id;
      const { data } = await createRoom(memberId);
      console.log(data);
      navigate("/chat");
    } catch (err) {
      console.log(err);

  };

  return (
    <div className="profile">
      <div className="images">
        {User && (
          <img onClick={() => coverPicRef.current.click()} src={userDetails?.coverPicture ? process.env.REACT_APP_PUBLIC_FOLDER + userDetails?.coverPicture : ""} alt="" className="cover" />
        )}
        {!User && (
          <img src={userDetails?.coverPicture ? process.env.REACT_APP_PUBLIC_FOLDER + userDetails.coverPicture : ""} alt="" className="cover" />
        )}

        {User && (
          <img onClick={() => profilePicRef.current.click()} src={userDetails?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userDetails?.profilePicture : ""} alt="" className="profilePic" />
        )}
        {!User && (
          <img src={userDetails?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userDetails?.profilePicture : ""} alt="" className="profilePic" />
        )}
      </div>
      <div className="profileContainer">
        <div className="profileData">
          <div className="uInfo1">
            <div className="left">
              <h3>Info</h3><br />
              <span>{User ? userDetails?.username : userDetails?.username} {" "}</span>
              <span>{User ? userDetails?.about : userDetails?.about} {" "}</span>
              <span>{User ? userDetails?.livesIn : userDetails?.livesIn} {" "}</span>
              <span>{User ? userDetails?.country : userDetails?.country} {" "}</span>

            </div>
            {User && (<ManageAccountsIcon onClick={() => setModalOpened(true)}
              style={{ marginBottom: '5.5rem', fontSize: '1.2rem' }} />)}
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
            />
          </div>

          <div style={{ display: "none" }}>
            <input
              ref={coverPicRef}
              type="file"
              name="coverPicture"
              onChange={handleImageChange} />
            <input
              ref={profilePicRef}
              type="file"
              name="profilePicture"
              onChange={handleImageChange} />

          </div>
          <div className="uInfo">

            <div className="center">

              <div className="info">
                <div className="item">
                  <div className='Udata'>
                    {User && <span>{userDetails?.totalPosts || 0}</span>}
                    {!User && <span>{userDetails?.totalPosts || 0}</span>}
                    <span> Posts</span> <hr />
                    <span>
                      <strong>
                        {User ? user?.followers?.length
                          : userDetails?.followers?.length}
                      </strong> Followers</span> <hr />

                    <span>
                      <strong>
                        {User ? user?.following?.length
                          : userDetails?.following?.length}
                      </strong> Following</span>
                  </div>
                  <div className='Msg'>
                    <button>Follow</button>
                    <button onClick={handleNewChatRoom}>Messages</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="right">

              <MoreVertIcon />


            </div>
          </div>
        </div>
        <Posts />
      </div>
    </div>
  )
}
}
export default Profile
