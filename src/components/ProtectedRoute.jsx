// components/ProtectedRoute.jsx
import { useGlobalContext } from "./Context/GlobalContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { auth, isVerifying } = useGlobalContext();
  const location = useLocation();

  if (isVerifying) return <div>Loading...</div>;

  return auth?.isLoggedIn ? (
    children
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
