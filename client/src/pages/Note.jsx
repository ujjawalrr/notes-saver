import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toasty from '../utils/Toast';
import { FaRegSave } from "react-icons/fa";
import axios from 'axios';
import Modal from "../components/Modal";
import Editor from '../components/editor/Editor';
import { formatLastUpdated } from '../utils/formatLastUpdated';

const Note = () => {
    const { currentUser } = useSelector(state => state.user)
    const params = useParams();
    const [note, setNote] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        setNote({ ...note, [e.target.id]: e.target.value })
    }
    const getNote = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/note/get/${params.noteId}`);
            setNote(res.data);
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getNote();
    }, [params.noteId]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await axios.put(`/api/note/update/${params.noteId}`, note);
            setNote(res.data.updatedNote);
            toasty(res.data.message, "success");
            setIsEditing(false);
        } catch (error) {
            toasty(error.response.data.message, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-60px)] bg-gradient-to-tr from-[#d3baa9] to-[#ffc9aa]">
            {loading &&
                <div className="w-full min-h-[calc(100vh-60px)] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            }
            {!loading && !error && note &&
                <div className="py-2 xs:py-5 md:py-8 px-1 xs:px-3">
                    <div className="max-w-4xl mx-auto shadow-md border rounded-md p-3 sm:p-6 lg:p-8 bg-white">
                        <div className="flex flex-wrap justify-between items-center border-b-2 mb-2" >
                            <div className="flex items-center justify-center text-2xl xs:text-3xl">
                                <button onClick={handleSave} className="mr-2 text-gray-500 hover:text-gray-700">
                                    <FaRegSave />
                                </button>
                                <Modal noteId={note._id} />
                            </div>
                            <p className="font-light">{formatLastUpdated(note.updatedAt)}</p>
                        </div>
                        <div className="bg-red-200">
                            <input id="title" type="text" className="text-3xl font-semibold text-center text-[#7f340a] w-full bg-transparent pt-3 sm:pt-6 pb-2 focus:outline-none" onChange={handleChange} value={note.title} required />
                            <div className="w-full flex flex-col justify-center">
                                <div className="flex flex-col">
                                    <Editor
                                        content={note.content}
                                        editable={true}
                                        onDataChange={(data) => {
                                            setNote({ ...note, content: data })
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {error &&
                <div className='text-red-600 text-2xl text-center pt-4'>{error}</div>
            }
        </div>
    )
}

export default Note;