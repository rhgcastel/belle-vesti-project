import React from "react";
import useAuth from "../hooks/useAuth";
import { useLocation, Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.type?.find(type => allowedRoles?.includes(type))
            ? <Outlet />
            : auth?.email
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default ProtectedRoute