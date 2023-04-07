import React from 'react'
import { NavLink } from "react-router-dom";
const Group = () => {
    return (
        <div className='m-4'>
            <div className='flex items-center gap-3 '>
                <h3 className='text-2xl font-bold'>Group</h3>
                <div className="form-control align-middle">
                    <input type="text" placeholder="Search" className="input input-bordered w-60 h-11" />
                </div>
            </div>
            <div className='bg-white rounded-md mt-4 p-4 flex flex-wrap gap-5 '>
                <div className="card w-60 bg-base-100 shadow-xl">
                    <figure><img className='rounded-full w-44 h-44' src="https://morganwhite.com/assets/img/icon-group.png" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">71353099</h2>
                        <p>Habibashi@gmail.com</p>
                        <div className="card-actions justify-end">
                            <NavLink to={"/chat/1"} className="btn bg-navBgColor">Chat</NavLink>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Group