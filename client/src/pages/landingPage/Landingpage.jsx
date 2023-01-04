import React from 'react';
import "./landingpage.scss"
import { FaBehance,  FaDribbble } from 'react-icons/fa';
import { IoMailOutline, IoChevronForwardCircle, IoStar } from 'react-icons/io5'
import { IconContext } from 'react-icons/lib';
import Card from "../../components/card/Card"
import {motion} from 'framer-motion'
import { Link } from 'react-router-dom'


let easeing = [0.6,-0.05,0.01,0.99];

const stagger = {
    animate:{
        transition:{
            delayChildren:0.4,
            staggerChildren:0.2,
            staggerDirection:1
        }
    }
}

const fadeInUp = {
    initial:{
        y:-60,
        opacity:0,
        transition:{
            duration:0.6, ease:easeing
        }
    },
    animate:{
        y:0,
        opacity:1,
        transition:{
            duration:0.6,
            delay:0.5,
            ease:easeing
        }
    }
};

const transition = {duration:1.4, ease:[0.6,0.01,-0.05,0.9]};

const firstname ={
    initial:{
        y:-20,
    },
    animate:{
        y:0,
        transition:{
            delayChildren:0.4, 
            staggerChildren:0.04,
            staggerDirection:-1
        }
    }
};

const lastname ={
    initial:{
        y:-20,
    },
    animate:{
        y:0,
        transition:{
            delayChildren:0.4, 
            staggerChildren:0.04,
            staggerDirection:1
        }
    }
};

const letter ={
    initial:{
        y:400,
    },
    animate:{
        y:0,
        transition:{duration:1, ...transition}
    }
};

const btnGroup = {
    initial:{
        y:-60,
        opacity:0,
        transition:{duration:0.6, ease:easeing }
    },
    animate:{
        y:0,
        opacity:1,
        animate:{
            duration:0.6,
            ease:easeing
        }
    }
};

const star= {
    initial:{
        y:60,
        opacity:0,
        transition:{duration:0.8, ease:easeing }
    },
    animate:{
        y:0,
        opacity:1,
        animate:{
            duration:0.6,
            ease:easeing
        }
    }
};

const header = {
    initial:{
        y:-60,
        opacity:0,
        transition:{duration:0.04, ease:easeing }
    },
    animate:{
        y:0,
        opacity:1,
        animate:{
            duration:0.6,
            ease:easeing
        }
    }
};


const Landingpage = () => {
    return (
        <motion.div initial='initial' animate='animate' > 
        <motion.header variants={stagger}>
            <motion.div className="logo_wrapper" variants={header}>Reach<span>Me</span></motion.div>
            <motion.div className="menu_container" variants={stagger}>
                <motion.span variants={header}>
                    <IconContext.Provider value={{ color: "#000", size: "18px", className: "icons_container" }}>
                        {/* <div className="icon"><FaBehance /></div>
                        <div className="icon"><FaDribbble /></div> */}
                    </IconContext.Provider>
                </motion.span>
                <motion.span variants={header}>
                    <IconContext.Provider value={{ color: "#000", size: "18px"}}>
                        <div className="icon"><IoMailOutline /></div>
                        hello@reachme.in
                    </IconContext.Provider>

                </motion.span>
                <motion.span className="menu"variants={header}>
                    <span></span>
                    <span></span>
                    <span></span>

                </motion.span>
            </motion.div>
        </motion.header>

        <motion.div className="content_wrapper" initial={{opacity:0,scale:0}} animate={{opacity:1, scale:1}}
        transition={{duration:0.3,ease:easeing}}>
         <div className="left_content_wrapper">
            <motion.h2>
              <motion.span variants={firstname} initial='initial' animate='animate' className="first">
                <motion.span variants={letter}>R</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>c</motion.span>
                <motion.span variants={letter}>h</motion.span>
                <motion.span variants={letter}></motion.span>
                <motion.span variants={letter} className="second"> M</motion.span>
                <motion.span variants={letter}>e</motion.span>
              </motion.span>
              <motion.span variants={lastname} initial='initial' animate='animate' className="last">
                <motion.span variants={letter}>M</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>k</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter} className="second"> Y</motion.span>
                <motion.span variants={letter}>o</motion.span>
                <motion.span variants={letter}>u</motion.span>
                <motion.span variants={letter}>r</motion.span>
                <motion.span variants={letter} className="second"> C</motion.span>
                <motion.span variants={letter}>o</motion.span>
                <motion.span variants={letter}>n</motion.span>
                <motion.span variants={letter}>n</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>c</motion.span>
                <motion.span variants={letter}>t</motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>o</motion.span>
                <motion.span variants={letter}>n</motion.span>
                {/* <motion.span variants={letter}>s.</motion.span> */}
              </motion.span>
              
            </motion.h2>
            <motion.p variants={fadeInUp}>Keeping up with friends is faster and easier than ever. <br/>Share photos and vedios
          send messages and get Updated.<br/>Connect with friends, family and find new people</motion.p>
          <motion.div className="btn_group" variants={stagger}>
          <Link to="/login" style={{textDecoration: 'none'}}>
            <motion.div className="btn btn_primary" variants={btnGroup} whileHover={{scale:1.05}} whileTap={{scale:0.95}} >Sign In
            <IconContext.Provider value={{ color: "#14da8f", size: "25px" }}>
                    <IoChevronForwardCircle />
            </IconContext.Provider>
            </motion.div>
            </Link>
            <Link to="/register" style={{textDecoration: 'none'}}>
            <motion.div className="btn btn_secondary" variants={btnGroup} whileHover={{scale:1.05}} whileTap={{scale:0.95}}>Sign Up</motion.div>
            </Link>
          </motion.div>

          <motion.div className="review_container" variants={stagger}>
            <motion.p className='total_review' variants={star}> 10k+ Reviews</motion.p>
            <IconContext.Provider value={{ color: "#fff", size: "18px"}}>
                    <motion.span variants={star} whileHover={{scale:1.2, rotate:180, borderRadius:'100%', cursor:'pointer'}}>< IoStar />
                    </motion.span>
                    <motion.span variants={star} whileHover={{scale:1.2, rotate:180, borderRadius:'100%', cursor:'pointer'}}>< IoStar />
                    </motion.span>
                    <motion.span variants={star} whileHover={{scale:1.2, rotate:180, borderRadius:'100%', cursor:'pointer'}}>< IoStar />
                    </motion.span>
                    <motion.span variants={star} whileHover={{scale:1.2, rotate:180, borderRadius:'100%', cursor:'pointer'}}>< IoStar />
                    </motion.span>
                    <motion.span variants={star} whileHover={{scale:1.2, rotate:180, borderRadius:'100%', cursor:'pointer'}}>< IoStar />
                    </motion.span>
            </IconContext.Provider>
            <motion.p className="more_review" variants={star}>More then 1M+ people </motion.p>
          </motion.div>
        </div> 
         <motion.div className="right_content_wrapper">
            <motion.img src="../../Images/bg.png" alt="bg"  initial={{x:200, opacity:0}}
            animate={{x:0,opacity:1}} transition={{duration:0.5, delay:0.8}} />
            
        </motion.div>   
       </motion.div>

       <Card/>
     </motion.div>
    );
}

export default Landingpage