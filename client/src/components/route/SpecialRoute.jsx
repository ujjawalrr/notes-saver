import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const SpecialRoute = () => {
    const { currentUser } = useSelector(state => state.user)
    return currentUser ? <Navigate to='/' /> : <Outlet />
}

export default SpecialRoute
