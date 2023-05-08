import { useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth);

    const onLogoutHandler = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }

    return (
        <div className="navbar bg-navBgColor sticky">
            <div className="flex-1">
                <label htmlFor="my-drawer" className="btn drawer-button">+</label>
                <button onClick={onLogoutHandler}>Logout</button>
                <NavLink to={`/profile/${user && user.id}`}>profile</NavLink>
            </div>
            <div className="flex">
                <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user && user.photo !== null ? user.photo : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} />
                        </div>
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <button onClick={onLogoutHandler}>Logout</button>
                        </li>
                    </ul>
                </div>


                {/* <button id="dropdownAvatarNameButton" data-dropdown-toggle="dropdownAvatarName" className="flex items-center text-sm font-medium text-gray-900 rounded-full md:mr-0  dark:text-white" type="button">
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 mr-2 rounded-full" src={user && user.photo} alt="user photo" />
                    Bonnie Green
                    <svg className="w-4 h-4 mx-1.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button> */}

                {/* <div id="dropdownAvatarName" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div className="font-medium ">Pro User</div>
                        <div className="truncate">name@flowbite.com</div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                        </li>
                    </ul>
                    <div className="py-2">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                    </div>
                </div> */}

            </div>

        </div >
    )
}

export default Navbar