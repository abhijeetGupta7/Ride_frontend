import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logoutCaptain } from "../utils/logoutCaptain";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogout = () => {
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    const doLogout = async () => {
      if (hasLoggedOut.current) return;
      hasLoggedOut.current = true;

      const result = await logoutCaptain();
      if (result.success) {
        setCaptain(null);
        navigate('/captain-login');
      }
    };

    doLogout();
  }, [navigate, setCaptain]);

  return (
    <div>
      <h1>Logging out captain</h1>
    </div>
  );
};

export default CaptainLogout;