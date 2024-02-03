import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../provider/authProvider';

export function ProtectedRouter() {
    const { accessToken } = useAuth()

    if (!accessToken) {
        return <Navigate to='/login' />
    }

    return <Outlet />
}