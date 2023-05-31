import React from 'react'
import Navbar from '../Components/Navbar';
import SideBar from '../Components/SideBar';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="flex-1">
            <Navbar />
            <SideBar />
        </div>
    )
}

export default Home