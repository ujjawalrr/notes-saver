import React, { useEffect, useState } from 'react';
import toasty from '../utils/Toast';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashCan } from "react-icons/fa6";
import axios from 'axios';

const Modal = ({ noteId }) => {
    const navigate = useNavigate();
    const [deleting, setDeleting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        setSearchQuery(urlParams.toString());
    }, [location.search])

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await axios.delete(`/api/note/delete/${noteId}`);
            toasty(res.data.message, "success");
            handleClose();
            if(searchQuery){
                navigate('/notes');
            }
            else{
                navigate('/notes?sort=updatedAt');
            }
        } catch (error) {
            toasty(error.response.data.message, "error");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div className=''>
            <button onClick={handleShow} className="text-red-500 hover:text-red-700">
                <FaRegTrashCan />
            </button>
            {showModal && (
                <div className="font-sans fixed top-0 left-0 px-2 w-full h-full flex items-center justify-center z-50">
                    <div className="absolute w-full h-full bg-gray-900 opacity-50" onClick={handleClose}></div>
                    <div className="bg-white rounded-lg z-50">
                        <div className="flex justify-between items-center border-b p-3">
                            <h3 className="text-xl font-semibold">Delete Note?</h3>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleClose}>
                                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.293 6.707a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-3 text-[16px] xs:text-lg">
                            <div className="pb-1 xs:pb-2">
                                Once deleted, you won't be able to get it back.
                            </div>
                            <div className='flex justify-between align-items-center'>
                                <button disabled={deleting} onClick={handleClose} className="mt-2 py-1 px-4 bg-white border border-red-600 text-red-600 rounded-md hover:opacity-95 disabled:opacity-80">Cancel</button>
                                <button disabled={deleting} onClick={handleDelete} className="mt-2 py-1 px-4 bg-red-600 border border-red-600 text-white rounded-md hover:opacity-95 disabled:opacity-80">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal