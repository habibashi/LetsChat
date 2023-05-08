import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { activeUsers, getActiveUsers, reset } from '../features/Manager/managerSlice'

const ActiveUsers = () => {

    const [formData, setFormData] = useState({
        user_id: '',
        active: ''
    })

    const { user_id, active } = formData

    const dispatch = useDispatch()

    const { users, isLoading, isError, message } = useSelector((state) => state.manager);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(reset());
        dispatch(getActiveUsers());
    }, [dispatch]);

    const onChangeHandler = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        dispatch(activeUsers(formData));
        console.log(formData)
    }

    return (
        <div className='pl-16 pt-5 pr-16'>
            <div>
                <h1 className='text-4xl'>Active Users</h1>
                <hr className='mt-10  bg-navBgColor rounded md:my-10' />
            </div>
            <form onSubmit={onSubmitHandler} className='flex gap-5 flex-wrap'>
                <div className='border-black'>
                    <select onChange={onChangeHandler} name='user_id' value={user_id} className="select select-bordered mt-8 w-full h-16 max-w-xs inputs peer rounded-lg">
                        <option disabled defaultValue=''>Users Id</option>
                        {users.length > 0 && users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>

                </div>
                <div>
                    <div className="flex items-center mb-4 mt-14">
                        <span className='mr-5'>Gender:</span>
                        <input onChange={onChangeHandler} id="1" type="radio" value='1' name="active" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
                        <input onChange={onChangeHandler} id="0" type="radio" value='0' name='active' className="ml-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="0" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Not Active</label>
                    </div>


                    {!isLoading ? (<button type='submit' className="btn ml-44 mt-8">
                        submit
                    </button>) : <button className="btn loading ml-44 mt-8">submit</button>}

                </div >
            </form >
        </div >
    )
}

export default ActiveUsers