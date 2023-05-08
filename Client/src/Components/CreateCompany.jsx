import React from 'react'
import Input from './Input'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { createCompany, reset } from '../features/Admin/AdminSlice'

const CreateCompany = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: '',
        logo: '',
        active: '',
    })

    const { name, email, description, logo } = formData
    const { isLoading, isError, message } = useSelector((state) => state.admin);

    const dispatch = useDispatch();

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
        dispatch(createCompany(formData));
        setFormData({
            name: '',
            email: '',
            description: '',
            logo: '',
            active: '',
        })
    }

    return (
        <div className='pl-16 pt-5 pr-16'>
            <div>
                <h1 className='text-4xl'>Craete Company</h1>
                <hr className='mt-10  bg-navBgColor rounded md:my-10' />
            </div>

            <form onSubmit={onSubmitHandler} className='flex gap-5 flex-wrap'>
                <div className='border-black'>
                    <Input
                        type='text'
                        name='name'
                        id='name'
                        value={name}
                        onChangeHandler={onChangeHandler}
                    >
                        Name
                    </Input>
                    <Input
                        type='email'
                        name='email'
                        id='email'
                        value={email}
                        onChangeHandler={onChangeHandler}
                    >
                        Email
                    </Input>
                    <Input
                        type='text'
                        name='description'
                        id='description'
                        value={description}
                        onChangeHandler={onChangeHandler}
                    >
                        Description
                    </Input>
                </div>
                <div >
                    <Input
                        type='text'
                        name='logo'
                        id='logo'
                        value={logo}
                        onChangeHandler={onChangeHandler}
                    >
                        Logo
                    </Input>

                    <div className="flex items-center mb-4 mt-10">
                        <span className='mr-5'>company</span>
                        <input onChange={onChangeHandler} id="1" type="radio" value='1' name="active" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
                        <input onChange={onChangeHandler} id="0" type="radio" value='0' name='active' className="ml-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="0" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Not Active</label>
                    </div>

                    {!isLoading ? (<button type='submit' className="btn mt-8">
                        submit
                    </button>) : <button className="btn loading mt-8">submit</button>}
                </div>
            </form>
        </ div>
    )
}

export default CreateCompany