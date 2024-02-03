import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../provider/authProvider';

export function ProtectedRouter() {
    const { token } = useAuth()

    if (!token) {
        return <Navigate to='/login' />
    }

    return <Outlet />
}