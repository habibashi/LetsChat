import React from 'react'
import { BiDotsVerticalRounded } from "react-icons/bi"
import { RxFace } from "react-icons/rx"
import { FaLocationArrow } from "react-icons/fa"
const Chat = () => {
    return (
        <div className="bg-white" style={{ height: "90vh" }}>
            <div className='border gap-3 bg-bgHeader flex items-center justify-between' style={{ height: "10vh" }}>
                <div className='flex items-center gap-3'>
                    <img className='w-11 h-11 rounded-full ml-4' src="https://images.pexels.com/photos/15656117/pexels-photo-15656117.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="img" />
                    <p className='font-bold'>Habib Ashi</p>
                </div>
                <div className="dropdown dropdown-end mr-4">
                    <label tabIndex={0}><BiDotsVerticalRounded className='w-6 h-6 cursor-pointer' /></label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
            </div>
            <div style={{ height: "72vh" }}>

            </div>
            <div className='border gap-3 bg-bgHeader flex items-center' style={{ height: "8vh" }}>
                <RxFace className='w-6 h-6 ml-3 cursor-pointer' />
                <div className="form-control align-middle flex-1">
                    <input type="text" placeholder="Type a message" className="input w-full h-11" />
                </div>
                <button type='submit'>
                    <FaLocationArrow className='w-6 h-6 mr-3 cursor-pointer' />
                </button>
            </div>
        </div >
    )
}

export default Chat