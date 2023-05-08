import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../Components/Spinner';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate("/");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChangeHandler = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()

        dispatch(login(formData));
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="flex justify-center h-screen">

            <div className="rounded-[10px] shadow-2xl w-[500px] mt-32 h-96 bg-white p-7" >
                <h3 className="text-black text-center font-bold text-3xl">Login</h3>
                <p className='text-black text-center mt-4'>log into your account</p>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-6">
                        <label
                            htmlFor="username"
                            className="w-max block mb-2 text-sm font-medium text-black"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            autoComplete="off"
                            id="email"
                            name="email"
                            className="border text-sm rounded-lg  block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                            placeholder="email"
                            value={email}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="w-max block mb-2 text-sm font-medium text-black"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="border text-sm rounded-lg  block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                            placeholder="password"
                            value={password}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-navBgColor hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Login
                    </button>
                </form>
            </div >
        </div >
    )
}

export default Login