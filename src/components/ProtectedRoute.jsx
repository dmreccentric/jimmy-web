import { Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "./Context/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { auth, isVerifying } = useGlobalContext();
  const location = useLocation();

  if (isVerifying) return <p>Loading...</p>;

  if (!auth?.isLoggedIn) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
