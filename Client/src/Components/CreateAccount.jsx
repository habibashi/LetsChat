import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCompanies, reset, createAccount } from '../features/Admin/AdminSlice';
import { toast } from "react-toastify";

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        gender: '',
        job_title: '',
        started_working_on: '',
        role: '',
        company_id: ''
    })

    const { name, email, password, password_confirmation, gender, job_title, started_working_on, role, company_id } = formData

    const dispatch = useDispatch()

    const { companies, isLoading, isError, message } = useSelector((state) => state.admin);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        dispatch(reset());
        dispatch(getCompanies());
    }, [dispatch]);

    const onChangeHandler = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        dispatch(createAccount(formData));

        setFormData({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            gender: '',
            job_title: '',
            started_working_on: '',
            role: '',
            company_id: ''
        })

    }
    return (
        <div className='pl-16 pt-5 pr-16'>
            <div>
                <h1 className='text-4xl'>Craete Account</h1>
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
                        type='password'
                        name='password'
                        id='password'
                        value={password}
                        onChangeHandler={onChangeHandler}
                    >
                        Password
                    </Input>
                    <Input
                        type='password'
                        name='password_confirmation'
                        id='password_confirmation'
                        value={password_confirmation}
                        onChangeHandler={onChangeHandler}
                    >
                        Confirm password
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
                </div>
                <div>
                    <Input
                        type='date'
                        name='started_working_on'
                        id='started_working_on'
                        value={started_working_on}
                        onChangeHandler={onChangeHandler}
                    >
                        started Work On
                    </Input>

                    <div className="flex items-center mb-4 mt-10">
                        <span className='mr-5'>Gender:</span>
                        <input onChange={onChangeHandler} id="male" type="radio" value='M' name="gender" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="male" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                        <input onChange={onChangeHandler} id="female" type="radio" value='F' name='gender' className="ml-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="female" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                    </div>


                    <div className="flex items-center mb-4 mt-14">
                        <span className='mr-5'>Role:</span>
                        <input onChange={onChangeHandler} id="admin" type="radio" value='admin' name='role' className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="admin" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Admin</label>
                        <input onChange={onChangeHandler} id="manager" type="radio" value='manager' name='role' className="ml-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="manager" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Manager</label>
                        <input onChange={onChangeHandler} id="employee" type="radio" value='employee' name='role' className="ml-3 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="employee" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Employee</label>
                    </div>


                    <select onChange={onChangeHandler} name='company_id' value={company_id} className="select select-bordered mt-8 w-full h-16 max-w-xs inputs peer rounded-lg">
                        <option disabled defaultValue=''>Company Id</option>
                        {companies.length > 0 && companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>

                    {!isLoading ? (<button type='submit' className="btn mt-8">
                        submit
                    </button>) : <button className="btn loading mt-8">submit</button>}

                </div >
            </form >
        </div >
    )
};


export default CreateAccount