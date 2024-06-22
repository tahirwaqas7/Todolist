import React from 'react';
import { RiDeleteBin5Line } from "react-icons/ri";

const Popup = ({ isOpen, onClose, onConfirmDelete }) => {
    return (
        <>
            {isOpen &&
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md mx-4 md:w-1/2 lg:w-1/3">
                        <div className="flex justify-center mt-4">
                            <RiDeleteBin5Line className='text-4xl md:text-5xl text-violet-800' />
                        </div>
                        <div className='flex justify-center mb-2 mt-2'>
                            <h2 className='text-xl md:text-2xl font-bold text-violet-800'>Confirm Delete</h2>
                        </div>
                        <p className='text-center px-4 md:px-6'>Are you sure you want to delete this todo?</p>
                        <div className="flex justify-around mt-4">
                            <button onClick={onConfirmDelete} className=' font-semibold bg-violet-800 text-white px-5 py-2 rounded-lg'>Yes</button>
                            <button onClick={onClose} className=' font-semibold bg-gray-100 px-5 py-2 rounded-lg'>No</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Popup;
