import React, { useEffect, useState } from 'react'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { editProfile, reset } from '../features/Profile/ProfileSlice'
import { toast } from "react-toastify";
const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: user && user.name,
        email: user && user.email,
        currPass: '',
        newPass: '',
        newPass_confirmation: '',
        job_title: user && user.job_title,
        photo: user && user.photo
    })

    const { name, email, currPass, newPass, photo, newPass_confirmation, job_title } = formData

    const dispatch = useDispatch()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.profile);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(reset());
    }, [dispatch]);

    const onChangeHandler = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (name.trim().length === 0) {
            return toast.error('enter your name');
        }

        if (newPass !== newPass_confirmation) {
            return toast.error("Password must be the same")
        }

        if (newPass !== newPass_confirmation && newPass < 8) {
            return toast.error("new Password must be greater than 8 character ")
        }

        if (isSuccess) {
            return toast.success("Updated")
        }

        dispatch(editProfile(formData));
        console.log(formData)
        setFormData((prevState) => ({
            ...prevState,
            name: name,
            email: email,
            currPass: '',
            newPass: '',
            newPass_confirmation: '',
            job_title: job_title,
            photo: photo
        }));
    }
    return (
        <form onSubmit={onSubmitHandler} className='flex p-8 gap-20 flex-wrap'>
            <div className='rounded-lg'>
                <div className="card w-60 bg-base-100 shadow-xl">
                    <figure><img className='rounded-full mt-3  w-44 h-44' src={user && user.photo !== null ? user && user.photo : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} /></figure>
                    <div className="card-body">
                        <div className="card-actions justify-center">
                            <label htmlFor="my-modal-3" className='text-blue-800 cursor-pointer'>Update Image</label>
                        </div>

                        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box relative">
                                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <div className='relative'>
                                    <input
                                        type='text'
                                        id='photo'
                                        name='photo'
                                        className={`inputs peer mt-4 h-16 rounded-lg`}
                                        autoComplete='off'
                                        placeholder=' '
                                        size={50}
                                        onChange={onChangeHandler}
                                        value={photo}
                                    />
                                    <label htmlFor='photo' className='labels'>
                                        Photo
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white p-3 rounded-lg'>
                <div className='flex gap-3'>
                    <div>
                        <Input
                            type='text'
                            name='name'
                            id='name'
                            onChangeHandler={onChangeHandler}
                            value={name}
                        >
                            Name
                        </Input>
                        <Input
                            type='email'
                            name='email'
                            id='email'
                            onChangeHandler={onChangeHandler}
                            value={email}
                        >
                            Email
                        </Input>
                        <Input
                            type='text'
                            name='job_title'
                            id='job_title'
                            value={job_title}
                            onChangeHandler={onChangeHandler}
                        >
                            Job Title
                        </Input>

                        <div className="flex items-center mb-4 mt-10">
                            <span className='mr-5'>Gender:</span>
                            <input onChange={onChangeHandler} id="male" type="radio" value='M' name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="male" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                            <input onChange={onChangeHandler} id="female" type="radio" value='F' name='gender' className="ml-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="female" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                        </div>
                    </div>
                    <div>
                        <Input
                            type='password'
                            name='currPass'
                            id='currPass'
                            value={currPass}
                            onChangeHandler={onChangeHandler}
                        >
                            Current Passwprd
                        </Input>
                        <Input
                            type='password'
                            name='newPass'
                            id='newPass'
                            value={newPass}
                            onChangeHandler={onChangeHandler}
                        >
                            New Password
                        </Input>
                        <Input
                            type='password'
                            name='newPass_confirmation'
                            id='newPass_confirmation'
                            value={newPass_confirmation}
                            onChangeHandler={onChangeHandler}
                        >
                            Confirm password
                        </Input>

                        {!isLoading ? (<button type='submit' className="btn mt-8">
                            submit
                        </button>) : <button className="btn loading mt-8">submit</button>}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Profile