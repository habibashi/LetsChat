const Navbar = () => {
    return (
        <div className="navbar bg-navBgColor sticky">
            <div className="flex-1">
                <label htmlFor="my-drawer" className="btn drawer-button">+</label>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://images.pexels.com/photos/15656117/pexels-photo-15656117.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-zinc-300 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar