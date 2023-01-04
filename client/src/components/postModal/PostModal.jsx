import React, { useState, useRef } from "react";
import "./modal.scss";
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useDispatch, useSelector } from "react-redux";
import { uploadPost,uploadImage } from "../../redux/actions/UploadAction";



export default function Modal() {


    const [modal, setModal] = useState(false);
    const dispatch = useDispatch()
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    const {uploading} = useSelector((state) => state.postReducer )
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [postDescription, setPostDescription] = useState("");
    const imageRef = useRef();
    const videoRef = useRef();
    const description = useRef();
    const {user} = useSelector((state) => state.authReducer.authData)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };

    const handleVideoChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let myVideo = event.target.files[0];
          setVideo(myVideo);
        }
      };
    
    const reset = () => {
        setImage(null);
        setVideo(null);
        description.current.value = null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
         
        const  newPost = {
            userId: user._id,  
            description: description.current.value          
        }
         if(image){
            const data = new FormData()
            const filename =  Date.now() + image.name;
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename;
            console.log(newPost);
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error);
            }
         }
         dispatch(uploadPost(newPost))
         reset();
    }


    return (
        <>
            <span onClick={toggleModal} className="btn-modal">
                <AddAPhotoRoundedIcon />
            </span>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div className="PostShare">
                            <img src="https://images.pexels.com/photos/2112735/pexels-photo-2112735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            <div>
                                <input 
                                ref={description} required
                                type="text" placeholder="Share your thoughts..." />
                                <div className="postOptions">
                                    <div className="option" style={{ color: "#007200" }}
                                        onClick={() => imageRef.current.click()}
                                    >
                                        <PhotoLibraryOutlinedIcon />
                                        Photo
                                    </div>
                                    <div className="option" style={{ color: "#38b000" }}>
                                        <VideoLibraryOutlinedIcon />
                                        Video
                                    </div>{" "}
                                    <div className="option" style={{ color: "#70e000" }}>
                                        <AddLocationAltOutlinedIcon />
                                        Location
                                    </div>{" "}
                                    <div className="option" style={{ color: "#9ef01a" }}>
                                        <CalendarMonthOutlinedIcon />
                                        Events
                                    </div>
                                    <button className="button ps-button"
                                    onClick={handleSubmit} >
                                   {uploading? "Uploading..." : "Share"}
                                    </button>
                                    <div style={{ display: "none" }}>
                                        <input
                                            type="file"
                                            name="myImage"
                                            ref={imageRef}
                                            onChange={onImageChange}
                                        />
                                    </div>
                                </div>
                                {image && (

                                    <div className="previewImage">
                                        {/* <UilTimes onClick={() => setImage(null)} /> */}
                                        <img src={URL.createObjectURL(image)} alt="" />
                                    </div>

                                )}


                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}