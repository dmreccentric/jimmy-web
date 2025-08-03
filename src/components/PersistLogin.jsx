import { Outlet } from "react-router-dom";
import { useGlobalContext } from "./Context/GlobalContext";

const PersistLogin = () => {
  const { isVerifying } = useGlobalContext();

  return isVerifying ? <p>Loading...</p> : <Outlet />;
};

export default PersistLogin;
