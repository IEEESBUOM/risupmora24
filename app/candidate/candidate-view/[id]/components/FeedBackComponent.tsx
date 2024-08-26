import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar";

export default function FeedBackComponent({company,communication,experience,problemSolving,technical,feedback}:{company:string,communication:number,experience:number,problemSolving:number,technical:number,feedback:string}) {
  return (
    <div className='bg-white rounded-md px-6 py-4 m-3 text-custom-black font-poppins text-sm    '>
        <div className="flex gap-2 ">
        <div className="">Company: </div>
        <div className="">{company}</div>
        </div>
        <div className=" grid grid-cols-2">
        
        <div className="">Communication Skills: </div>
        <div className="md:w-48 grid content-center "><ProgressBar  bgColor={'#29A7E1'} height='12px' labelSize={'10px'} animateOnRender={true} completed={communication} /></div>
        
        
        <div className="">Experience and projects : </div>
        <div className="md:w-48 grid content-center "><ProgressBar  bgColor={'#29A7E1'} height='12px' labelSize={'10px'} animateOnRender={true} completed={experience} /></div>
       
       
        <div className="">problem solving skills : </div>
        <div className="md:w-48 grid content-center "><ProgressBar  bgColor={'#29A7E1'} height='12px' labelSize={'10px'} animateOnRender={true} completed={problemSolving} /></div>
       
      
        <div className="">Techinical Skills: </div>
        <div className="md:w-48 grid content-center "><ProgressBar  bgColor={'#29A7E1'} height='12px' labelSize={'10px'} animateOnRender={true} completed={technical} /></div>
       
        </div>

        <div className="flex gap-2 ">
        <div className="">Feedback: </div>
        <div className="">{feedback}</div>
        </div>
      
    </div>
  )
}
