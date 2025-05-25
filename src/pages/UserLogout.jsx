import { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/logoutUser";
import { UserDataContext } from "../context/UserContext";


const UserLogout = () => {
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    const doLogout = async () => {
      if (hasLoggedOut.current) return; // Prevent multiple logouts, bcz in strict mode, useEffect runs twice  

      hasLoggedOut.current = true;
      const result = await logoutUser();
      if (result.success) {
        setUser(null); 
        navigate('/login');
      }
    };
    doLogout();
  }, [navigate, setUser]);

  return <div>Logging out...</div>;
};

export default UserLogout;