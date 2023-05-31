import React, { useEffect, useState } from 'react';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RxFace } from "react-icons/rx";
import { FaLocationArrow } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { createGroupMessage, getGroupMessages, reset } from '../features/Chat/GroupsSlice';
import { useParams } from 'react-router-dom';
export const GroupChat = () => {

    const { user } = useSelector((state) => state.auth);
    const params = useParams();
    const { room, isLoading } = useSelector((state) => state.groups);

    const [formData, setFormData] = useState({
        messages: [],
    });
    const dispatch = useDispatch();

    const { messages } = formData;

    useEffect(() => {
        dispatch(reset());
        dispatch(getGroupMessages(params.id));
    }, [dispatch, params.id]);

    const onChangeHandler = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const form = {
            chatRoom_id: params.id,
            name: user.name,
            message: formData.messages
        };
        dispatch(createGroupMessage(form))

        setFormData((prevState) => ({
            ...prevState,
            messages: []
        }));
    };

    return (
        <div className="bg-white" style={{ height: "90vh" }}>
            <div className='border gap-3 bg-bgHeader flex items-center justify-between' style={{ height: "10vh" }}>
                <div className='flex items-center gap-3'>
                    <p className='font-bold ml-3'>Group {user?.company_id}</p>
                </div>
                {/* <div className="dropdown dropdown-end mr-4">
                    <label tabIndex={0}><BiDotsVerticalRounded className='w-6 h-6 cursor-pointer' /></label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div> */}
            </div>
            <div className='overflow-y-auto' style={{ height: "72vh" }}>
                {isLoading &&
                    <div role="status" className="flex justify-center items-center p-52 bg-white">
                        <svg
                            aria-hidden="true"
                            className="inline w-16 h-16 mr-2 animate-spin text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fillRule="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fillRule="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                }
                {!isLoading && room.messages?.map(message => (
                    <div key={message.id} className={`chat-header ${message.name === user.name
                        ? 'text-end mr-3'
                        : 'text-start ml-3'
                        }`}>
                        {message.name}
                        <li
                            key={message.id}
                            className={`chat ${message.name === user.name
                                ? 'chat-end ml-3'
                                : 'chat-start mr-3'
                                }`}
                        >
                            <div
                                className={`chat-bubble ${message.name === user.name
                                    ? ''
                                    : 'bg-slate-100 text-black'
                                    }`}
                            >
                                {message.message}
                            </div>
                        </li>
                    </div>
                ))}
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className='border gap-3 bg-bgHeader flex items-center' style={{ height: "8vh" }}>
                    <RxFace className='w-6 h-6 ml-3 cursor-pointer' />
                    <div className="form-control align-middle flex-1">
                        <input
                            type="text"
                            placeholder="Type a message"
                            name='messages'
                            id="messages"
                            value={messages}
                            className="input w-full h-11"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <button type='submit'>
                        <FaLocationArrow className='w-6 h-6 mr-3 cursor-pointer' />
                    </button>
                </div>
            </form>
        </div >
    );
}
