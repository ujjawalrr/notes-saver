import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toasty from '../utils/Toast';
import axios from 'axios';
import Editor from '../components/editor/Editor';

const AddNote = () => {
    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate();
    const [noteData, setNoteData] = useState({
        title: '',
        content: 'Add Content Here...',
        userID: currentUser._id
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setNoteData({ ...noteData, [e.target.id]: e.target.value })
    }
    const handleAddNote = async () => {
        setLoading(true);
        try {
            const res = await axios.post('/api/note/add', noteData);
            toasty(res.data.message, "success");
            navigate(`/note/${res.data.note._id}`);
        } catch (error) {
            toasty(error.response.data.message, "error");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-[calc(100vh-60px)] bg-gradient-to-tr from-[#d3baa9] to-[#ffc9aa]">
            {loading &&
                <div className="w-full min-h-[calc(100vh-60px)] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            }
            {!loading &&
                <div className="py-2 xs:py-5 md:py-8 px-1 xs:px-3">
                    <div className="max-w-4xl mx-auto shadow-md border rounded-md p-3 sm:p-6 lg:p-8 bg-white">
                        <h1 className='text-3xl font-semibold text-center text-[#7f340a]'>Add a Note</h1>
                        <div className="w-full flex flex-col justify-center">
                            <div className="flex flex-col py-3 gap-2">
                                <label htmlFor="title" className="text-xl font-semibold">Title</label>
                                <input placeholder="Note Title" id="title" type="text" onChange={handleChange} className="px-3 py-2 border border-black rounded-md" required />
                            </div>
                            <div className="flex flex-col md:py-3 gap-2">
                                <label htmlFor="content" className="text-xl font-semibold">Content</label>
                                <div>
                                    <Editor
                                        content={noteData.content}
                                        editable={true}
                                        onDataChange={(data) => {
                                            setNoteData({ ...noteData, content: data })
                                        }}
                                    />
                                </div>
                            </div>
                            <button onClick={handleAddNote} disabled={loading} className="w-full py-2 my-2 bg-gradient-to-r from-[#d16d2c] to-[#7f340a] border border-[#492815] text-white rounded-md hover:opacity-95 disabled:opacity-80">{loading ? 'Saving' : 'Save'}</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddNote
