import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getAdminUsers, getEmployeeManagerUsers, getPeople, reset } from '../features/Chat/PeopleSlice'
const People = () => {
    const [search, setSearch] = useState('');
    const { user } = useSelector((state) => state.auth);
    const { adminUsers, employeeManagerUsrs, isLoading, isError, message } = useSelector((state) => state.people);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(reset());
        if (user && user.role === 'admin')
            dispatch(getAdminUsers())
        else
            dispatch(getEmployeeManagerUsers())
    }, [dispatch]);

    const onSearchHandler = (event) => {
        setSearch((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        dispatch(getPeople(search))
        console.log(search)
    }
    return (
        <div className='m-4'>
            <div className='flex items-center gap-3 '>
                <h3 className='text-2xl font-bold'>People</h3>
                <form onSubmit={onSubmitHandler} className="form-control align-middle">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered w-60 h-11"
                        name="search"
                        onChange={onSearchHandler}
                    />
                    <button type="submit" hidden>search</button>
                </form>
            </div>
            <div className='bg-white rounded-md mt-4 p-4 flex flex-wrap gap-2'>
                {/* {people && people.data && people.data.length > 0 && people.data.map((search) => (
                    <div key={search.id} className="card w-60 bg-base-100 shadow-xl">
                        <figure><img className='rounded-full w-44 h-44' src="https://images.pexels.com/photos/15656117/pexels-photo-15656117.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">71353099</h2>
                            <p>{search.name}</p>
                            <div className="card-actions justify-end">
                                <NavLink to={"/chat/1"} className="btn bg-navBgColor">Chat</NavLink>
                            </div>
                        </div>
                    </div>
                ))} */}
                {isLoading && (
                    (adminUsers.length > 0 && adminUsers.filter(u => u.id !== user.id).map(() => (
                        <div role="status" className="max-w-sm p-4 border border-gray-200 rounded-xl shadow animate-pulse md:p-6 dark:border-gray-700">
                            <div className="flex rounded-full items-center justify-center h-44 w-44 mb-4 bg-gray-300 dark:bg-gray-700">
                                <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                            </div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            <div className="flex items-center mt-4 space-x-3">
                                <svg className="text-gray-200 w-14 h-14 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                                <div>
                                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                </div>
                            </div>
                            <span className="sr-only">Loading...</span>
                        </div>

                    )))
                )}
                {!isLoading && user && user.role === "admin" ?
                    (adminUsers.length > 0 && adminUsers.filter(u => u.id !== user.id).map(user => (
                        (<div key={user.id} className="card w-60 bg-base-100 shadow-xl">
                            <figure><img className='rounded-full w-44 h-44' src={user.photo !== null ? user.photo : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt={user.photo} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{user.email}</h2>
                                <p>{user.name}</p>
                                <div className="card-actions justify-end">
                                    <NavLink to={`/chat/${user.id}`} className="btn bg-navBgColor">Chat</NavLink>
                                </div>
                            </div>
                        </div>)
                    ))) :
                    ((employeeManagerUsrs.length > 0 && employeeManagerUsrs.filter(u => u.id !== user.id).map(user => (
                        <div key={user.id} className="card w-60 bg-base-100 shadow-xl">
                            <figure><img className='rounded-full w-44 h-44' src={user.photo !== null ? user.photo : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{user.email}</h2>
                                <p>{user.name}</p>
                                <div className="card-actions justify-end">
                                    <NavLink to={`/chat/${user.id}`} className="btn bg-navBgColor">Chat</NavLink>
                                </div>
                            </div>
                        </div>
                    ))))
                }
            </div>
        </div>
    )
}

export default People