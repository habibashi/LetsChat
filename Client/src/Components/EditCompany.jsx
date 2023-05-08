import React from 'react'
import Input from './Input'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";
import { editCompany, reset } from '../features/Manager/managerSlice'
const EditCompany = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: '',
        logo: ''
    })

    const { name, email, description, logo } = formData
    const { isLoading, isError, message } = useSelector((state) => state.manager);

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

        dispatch(editCompany(formData));
        console.log(formData)
    }

    return (
        <div className='pl-16 pt-5 pr-16'>
            <div>
                <h1 className='text-4xl'>Edit Company</h1>
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

                    {!isLoading ? (<button type='submit' className="btn ml-48 mt-28">
                        submit
                    </button>) : <button className="btn loading ml-48 mt-28">submit</button>}
                </div>
            </form>
        </ div>
    )
}

export default EditCompany