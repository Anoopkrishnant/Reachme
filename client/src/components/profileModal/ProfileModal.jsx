import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/UserAction';
import './profileModal.scss'


const ProfileModal = ({modalOpened, setModalOpened}) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [userData, setUserData] = useState({
    username: user.username,
    about: user.about || "",
    relationShip: user.relationShip || "",
    livesIn: user.livesIn || "",
    country: user.country || "",
    worksAt: user.worksAt || "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateProfile(user._id, userData));
    setModalOpened(false);
  };



  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size= '45%'
      opened = {modalOpened}
      onClose = {()=>setModalOpened(false)}
    >
       <form className="infoForm" onSubmit={handleSubmit}>
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            onChange={handleChange}
            placeholder="Full Name"
            value={userData.username}
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            name="about"
            onChange={handleChange}
            value={userData.about}
            placeholder="About"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            onChange={handleChange}
            value={userData.worksAt}
            placeholder="Works at"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            onChange={handleChange}
            value={userData.livesIn}
            placeholder="LIves in"
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            onChange={handleChange}
            value={userData.country}
            placeholder="Country"
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="relationShip"
            onChange={handleChange}
            value={userData.relationShip}
            placeholder="RelationShip Status"
          />
        </div>


        {/* <div>
            Profile Image 
            <input type="file" name='profileImg'/>
            Cover Image
            <input type="file" name="coverImg" />
        </div> */}

        <button className="button infoButton" type="submit" >Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;