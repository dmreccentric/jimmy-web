import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "./Context/GlobalContext";

const PersistLogin = () => {
  const { isVerifying, auth, persist } = useGlobalContext();
  const location = useLocation();

  if (!persist) {
    // if not persisting, just check if logged in now
    return auth?.isLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate to="/admin/login" state={{ from: location }} replace />
    );
  }

  // if persisting, wait for verification to finish
  if (isVerifying) {
    return <p>Loading...</p>;
  }

  return auth?.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};

export default PersistLogin;
