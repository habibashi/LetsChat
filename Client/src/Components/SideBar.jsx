import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const SideBar = () => {
    const { user } = useSelector((store) => store.auth)
    return (
        <div className="drawer" style={{ height: "90vh" }}>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    <li><NavLink to={"/people"}>People</NavLink></li>
                    <li><NavLink to={"/group"}>Gropup</NavLink></li>
                    {user && user.role === "admin" && (
                        <>
                            <li><NavLink to={"/createAccount"}>Create Account</NavLink></li>
                            <li><NavLink to={"/createCompany"}>Create Company</NavLink></li>
                            <li><NavLink to={"/activeCompany"}>Active Company</NavLink></li>
                        </>
                    )}
                    {user && user.role === "manager" && (
                        <>
                            <li><NavLink to={"/editCompany"}>Edit Company</NavLink></li>
                            <li><NavLink to={"/activeUsers"}>Active Users</NavLink></li>
                        </>
                    )}
                </ul>
            </div >
        </div >
    )
}

export default SideBar