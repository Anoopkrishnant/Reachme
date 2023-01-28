import React from "react";
import "./notification.scss";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { clearNotifications } from "../../redux/actions/UserAction";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
const serverImages = process.env.REACT_APP_PUBLIC_FOLDER;

const Notifications = React.forwardRef(({ notifications }, ref) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.authReducer.authData.user._id);
  const handleClearNotification = () => {
    dispatch(clearNotifications(userId));
  };
  const cardRefs = useRef([]);
  const testRef = useRef(null)
  //using intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // adding and removing show class
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });
    cardRefs.current.forEach((card) => {
      observer.observe(card.current);
    });
    return () => observer.disconnect();
  }, []);

  return (

    <div ref={ref} className="notification-list">
      <div>
        {notifications.map(( notification, index) => {
          cardRefs.current[index] = testRef;
          return (
            <div
              key={notification.id}
              ref={cardRefs.current[index]}
              className="notification-item"
            >
              <Link to={notification.link}>
                <img src={`${serverImages}/${notification.profilePicture}`} />
              </Link>
              <div>
                <h2>{notification.title}</h2>
                <p>{notification.message}</p>
                <p>{moment(notification.time).fromNow()}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="notification-clear" onClick={handleClearNotification}>
        <DeleteOutlineRoundedIcon />
      </div>
    </div>
 
  );
});

export default Notifications;