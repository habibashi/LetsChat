import React from 'react'

const login = () => {
    return (
        <div className="flex justify-center h-screen">

            <div className="rounded-[10px] shadow-2xl w-[500px] mt-32 h-96 bg-white p-7" >
                <h3 className="text-black text-center font-bold text-3xl">Login</h3>
                <p className='text-black text-center mt-4'>log into your account</p>
                <form>
                    <div className="mb-6">
                        <label
                            htmlFor="username"
                            className="w-max block mb-2 text-sm font-medium text-black"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            autoComplete="off"
                            id="email"
                            name="email"
                            className="border text-sm rounded-lg  block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="email"
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
                            className="border text-sm rounded-lg  block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="password"
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

export default login