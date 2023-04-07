import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from "react-router-dom";
const SideBar = () => {
    return (
        <div className="drawer" style={{ height: "90vh" }}>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    <li><NavLink to={"/people/1"}>People</NavLink></li>
                    <li><NavLink to={"/group/1"}>Gropup</NavLink></li>
                    <li><a>Create Account</a></li>
                    <li><a>Create Company</a></li>
                    <li><a>Active Company</a></li>
                    <li><a>Edit Company</a></li>
                </ul>
            </div >
        </div >
    )
}

export default SideBar