import React from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import "./Action.scss";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../redux/actions/PostActions";

const Actions = React.forwardRef(
  ({ postId, userId, openReportModal, onEdit }, ref) => {
    const currentUserId = useSelector(
      (state) => state.authReducer.authData.user._id
    );
    const dispatch = useDispatch();
    const handleDelete = () => {
      const confirm = window.confirm("Are you sure you ?");
      console.log(confirm);
      if (!confirm) return;
      dispatch(deletePost(postId));
    };

    return (
      <div ref={ref} className="actions">
        <ul>
          {currentUserId === userId && (
            <li onClick={onEdit}>
              <ModeEditIcon /> Edit
            </li>
          )}
          {currentUserId === userId && (
            <li onClick={handleDelete}>
              <DeleteOutlineRoundedIcon /> Delete
            </li>
          )}
          <li onClick={openReportModal}>
            <ReportGmailerrorredRoundedIcon /> Report
          </li>
        </ul>
      </div>
    );
  }
);

export default Actions;