import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Modal from '../components/Modal';
import { CiEdit } from "react-icons/ci";
import axios from 'axios';
import { formatLastUpdated } from '../utils/formatLastUpdated';

const AllNotes = () => {
    const { currentUser } = useSelector(state => state.user)
    const params = useParams();
    const navigate = useNavigate();
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        sort: 'updated_at',
        order: 'desc',
    });
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [showMoreError, setShowMoreError] = useState(false);
    const [showMoreLoading, setShowMoreLoading] = useState(false);
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
        if (searchTermFromUrl || sortFromUrl || orderFromUrl) {
            setSideBarData({
                searchTerm: searchTermFromUrl || '',
                sort: sortFromUrl || 'updatedAt',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchNotes = async () => {
            setLoading(true);
            setShowMore(false);
            setError(false);
            setShowMoreError(false)
            try {
                const searchQuery = urlParams.toString();
                const res = await axios.get(`/api/note/getAll/${currentUser._id}?${searchQuery}`);
                if (res.data.length > 9) {
                    setShowMore(true);
                } else {
                    setShowMore(false);
                }
                setLoading(false);
                setError(false);
                setNotes(res.data);
            } catch (error) {
                setLoading(false);
                setError(error.response.data.message);
            }
        }

        fetchNotes();
    }, [location.search]);

    const onShowMoreClick = async () => {
        setShowMoreLoading(true);
        try {
            const numberOfNotes = notes.length;
            const startIndex = numberOfNotes;
            const urlParams = new URLSearchParams(location.search);
            urlParams.set('startIndex', startIndex);
            const searchQuery = urlParams.toString();
            const res = await axios.get(`/api/note/getAll/${currentUser._id}?${searchQuery}`);
            if (res.data.length === 0) {
                setError('No more notes found!');
            }
            if (res.data.length < 10) {
                setShowMore(false);
            }
            setShowMoreLoading(false);
            setError(false);
            setNotes([...notes, ...res.data]);
        } catch (error) {
            setShowMoreLoading(false);
            setShowMoreError(error.response.data.message);
        }
    }
    return (
        <div className="min-h-[calc(100vh-60px)] bg-gradient-to-tr from-[#d3baa9] to-[#ffc9aa]">
            {loading &&
                <div className="w-full min-h-[calc(100vh-60px)] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            }
            <div className="flex flex-col items-center justify-center">
                {!loading && !error && notes?.length > 0 &&
                    <div className={`px-3 w-full xs:w-[430px] md:w-[740px] lg:w-[970px] ${!showMore && 'pb-8'}`}>
                        <h1 className='text-3xl text-center font-semibold py-5 text-[#7f340a]'>Your Notes</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {notes.map((note) =>
                                <div key={note._id} className="p-6 w-full mx-auto bg-white shadow-md rounded-md overflow-hidden">
                                    <Link to={`/note/${note._id}`} className="text-lg font-semibold mb-2 line-clamp-1">{note.title}</Link>
                                    <div className={`w-full flex justify-between items-center border-b-2 pb-1`}>
                                        <div className="flex flex-wrap gap-2 items-center justify-center text-xl xs:text-2xl">
                                            <Link to={`/note/${note._id}`} className="text-gray-500 hover:text-gray-700">
                                                <CiEdit />
                                            </Link>
                                            <Modal noteId={note._id} />
                                        </div>
                                        <p className="font-light">{formatLastUpdated(note.updatedAt)}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                }
                {!error && !showMoreError && showMore && (
                    <button onClick={onShowMoreClick} className='text-red-700 p-7 text-center w-full hover:underline'>Show More</button>
                )}
                {showMoreLoading && (
                    <p className='text-xl text-slate-700 text-center w-full'>Searching...</p>
                )}
                {error && (
                    <p className='text-2xl text-red-700 text-center w-full py-4'>{error}</p>
                )}
                {showMoreError && (
                    <p className='text-xl text-red-700 text-center w-full py-4'>{showMoreError}</p>
                )}
            </div>
        </div >
    )
}

export default AllNotes
