import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getCompanies, reset } from '../features/Admin/AdminSlice';
import { getGroups } from '../features/Chat/GroupsSlice';
const Group = () => {
    const { companies, isLoading, isError, message } = useSelector((state) => state.admin);
    const { groups, isLoad } = useSelector((state) => state.groups);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(reset());
        dispatch(getCompanies());
        dispatch(getGroups());
    }, [dispatch]);

    return (
        <div className='m-4'>
            <div className='flex items-center gap-3 '>
                <h3 className='text-2xl font-bold'>Group</h3>
            </div>
            <div className='bg-white rounded-md mt-4 p-4 flex flex-wrap gap-5 '>
                {isLoading && isLoad &&
                    (companies.length > 0 && companies.map(() => (
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
                }

                {!isLoading && !isLoad && user && user.role === "admin" ?
                    (companies.length > 0 && companies.map((company) => (
                        <div key={company.id} className="card w-60 bg-base-100 shadow-xl">
                            <figure><img className='rounded-full w-44 h-44' src={company.logo !== null ? `${company.logo}` : "https://morganwhite.com/assets/img/icon-group.png"} alt={user.photo} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{company.email}</h2>
                                <p>{company.name}</p>
                                <div className="card-actions justify-end">
                                    <NavLink to={`/chat/${company.id}`} className="btn bg-navBgColor">Chat</NavLink>
                                </div>
                            </div>
                        </div>
                    ))) :
                    (<div className="card w-60 bg-base-100 shadow-xl">
                        <figure><img className='rounded-full w-44 h-44' src={groups.logo !== null ? groups.logo : "https://morganwhite.com/assets/img/icon-group.png"} alt={groups.logo} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{groups.email}</h2>
                            <p>{groups.name}</p>
                            <div className="card-actions justify-end">
                                <NavLink to={`/chat/${groups.id}`} className="btn bg-navBgColor">Chat</NavLink>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Group