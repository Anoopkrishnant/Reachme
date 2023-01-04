import React from 'react'
import "./card.scss"
import { IoVideocam, IoChevronForward, IoMoon, IoNotifications, IoLockClosed, IoHeart, IoChatbubblesOutline, IoCalendarNumber } from "react-icons/io5"
import { IconContext } from 'react-icons/lib';
import {motion} from 'framer-motion'

let easing = [0.6,-0.05,0.01,0.99];

const container = {
    show:{
        transition:{
            staggerChildern:0.2
        }
    }
};
 
const item = {
    hidden: {opacity:0, y:20},
    show:{
        opacity:1,
        y:0,
        transition:{
             ease:'easeInOut',
             duration:.2
        }
    }
}
 const title ={
    hidden:{
        y:60,
        opacity:0
    },
    show:{
        y:0,
        opacity:1,
        transition:{
            delay:0.2,
            duration:0.6,
            ease:easing
        }
    }
 };

 const hoverEffect={
    whileHover:{
        scale:1.5, rotate:630, borderRadius:"100%"
    },
    whileTap:{
         scale:0.8, rotate:630,borderRadius:"100%"
    }
 }

const Card = () => {
    return (
        <motion.div className="service_container">
            <div className="title_wrapper">
                <motion.span className="service_title"
                    initial= {{y:20, opacity:0}}
                    animate= {{y:0, opacity:1}}
                    exit= {{opacity:0}}
                    transition= {{duration:.5, delay:1.8}}
                    >What Make's Us special !</motion.span>
                <motion.h2
                initial= {{y:200, opacity:0}}
                animate= {{y:0, opacity:1}}
                exit= {{opacity:0}}
                transition= {{duration:.5, delay:1}}
                >Connect with friends, family, find new people<br />And get updated</motion.h2>
            </div>
            <motion.div className="service_card" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{once:false}} >

                <motion.div className="card" variants={item}>
                    <motion.span className="service_icon" style={{ backgroundColor: "#80ffdb" }} variants={hoverEffect} 
                    whileHover="whileHover" whileTap="whileTap">
                        <IconContext.Provider value={{ color: "#38b000", size: "22px" }}>
                            <IoChatbubblesOutline />
                        </IconContext.Provider>
                    </motion.span>
                    <h3>Chat With Everyone</h3>
                    <a href="#">
                        <span>Learn More</span>
                        <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
                            <IoChevronForward />
                        </IconContext.Provider>
                    </a>
                </motion.div>
                <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{ backgroundColor: "#cfbaf0" }} variants={hoverEffect} 
                    whileHover="whileHover" whileTap="whileTap">
                        <IconContext.Provider value={{ color: "#480ca8", size: "22px" }}>
                            <IoHeart />
                        </IconContext.Provider>
                    </motion.span>
                    <h3>Post Your Moments</h3 >
                    <a href="#">
                        <span>Learn More</span>
                        <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
                            <IoChevronForward />
                        </IconContext.Provider>
                    </a>
                </motion.div>
                <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{ backgroundColor: "#fbf8cc" }} variants={hoverEffect} 
                    whileHover="whileHover" whileTap="whileTap">
                        <IconContext.Provider value={{ color: "#f8961e", size: "22px" }}>
                            <IoVideocam />
                        </IconContext.Provider>
                    </motion.span>
                    <h3>Face To Face Chat</h3>
                    <a href="#">
                        <span>Learn More</span>
                        <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
                            <IoChevronForward />
                        </IconContext.Provider>
                    </a>
                </motion.div>
                <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{ backgroundColor: "#e7bc91" }} variants={hoverEffect} 
                    whileHover="whileHover" whileTap="whileTap">
                        <IconContext.Provider value={{ color: "#603808", size: "22px" }}>
                            <IoCalendarNumber />
                        </IconContext.Provider>
                    </motion.span>
                    <h3> Plan Your Events</h3>
                    <a href="#">
                        <span>Learn More</span>
                        <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
                            <IoChevronForward />
                        </IconContext.Provider>
                    </a>
                </motion.div>
                <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{ backgroundColor: "#a9def9" }} variants={hoverEffect} 
                    whileHover="whileHover" whileTap="whileTap">
                        <IconContext.Provider value={{ color: "#3f37c9", size: "22px" }}>
                            <IoMoon />
                        </IconContext.Provider>
                    </motion.span>
                    <h3> Dark Mode</h3>
                    <a href="#">
                        <span>Learn More</span>
                        <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
                            <IoChevronForward />
                        </IconContext.Provider>
                    </a>
                </motion.div>
                <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{ backgroundColor: "#d0f4de" }} variants={hoverEffect} 
                    whileHover="whileHover" whileTap="whileTap">
                        <IconContext.Provider value={{ color: "#14da8f", size: "22px" }}>
                            <IoNotifications />
                        </IconContext.Provider>
                    </motion.span>
                    <h3>Notification and News Feed</h3>
                    <a href="#">
                        <span>Learn More</span>
                        <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
                            <IoChevronForward />
                        </IconContext.Provider>
                    </a>
                </motion.div>
                <motion.div className="card" variants={item}>
                <motion.span className="service_icon" style={{ backgroundColor: "#ffc4d6" }} variants={hoverEffect} 
                    whileHover="whileHover" whileTap="whileTap">
                        <IconContext.Provider value={{ color: "#ff499e", size: "22px" }}>
                            <IoLockClosed />
                        </IconContext.Provider>
                    </motion.span>
                    <h3>Privacy and Security</h3>
                    <a href="#">
                        <span>Learn More</span>
                        <IconContext.Provider value={{ color: "#7ae582", size: "18px" }}>
                            <IoChevronForward />
                        </IconContext.Provider>
                    </a>
                </motion.div>
                <motion.div className="card dark" variants={item} >

                    <h2>Reach Me</h2>
                    {/* <img src="" alt="line" className="line" /> */}
                    <a href="#">
                        <span>Know More...</span>
                        <motion.span className="service_icon" style={{ backgroundColor: "#14da8f" }}variants={hoverEffect}
                                            whileHover="whileHover" whileTap="whileTap">
                            <IconContext.Provider value={{ color: "#fff", size: "18px" }}>
                                <IoChevronForward />
                            </IconContext.Provider>
                        </motion.span>
                        <IconContext.Provider value={{ color: "#fff", size: "18px" }}>
                            <IoChevronForward />
                        </IconContext.Provider>
                    </a>
                </motion.div>

            </motion.div>
        </motion.div>
    )
}

export default Card