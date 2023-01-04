import React from 'react'
import "./stories.scss"

const Stories = () => {


    //Temp data
    const stories = [
    {
        id:1,
        name: "Aswanth",
        img:"https://images.pexels.com/photos/7595190/pexels-photo-7595190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id:2,
        name: "Javad Ali",
        img:"https://images.pexels.com/photos/2643143/pexels-photo-2643143.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
        id:3,
        name: "Nandhu",
        img:"https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
        id:4,
        name: "Aswin",
        img:"https://images.pexels.com/photos/1019771/pexels-photo-1019771.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    
  ];

  return (
    <div className='stories'>
        <div className="story">
                <img src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <span>Adharsh</span>
                <button>+</button>
            </div>
        {stories.map(story=>(
            <div className="story" key={story.id}>
                <img src={story.img} alt="" />
                <span>{story.name}</span>
            </div>
        ))}
    </div>
  )
}

export default Stories
