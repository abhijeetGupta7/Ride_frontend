import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import axios, { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      navigate("/login", { replace: true });
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/user/profile`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          const data = response.data.data;
          setUser({
            email: data.email,
            fullname: data.fullname,
            id: data._id,
          });
          setIsVerified(true);
        }
      })
      .catch((err) => {
        console.error("Authentication error:", err);
        setUser(null);
        localStorage.removeItem("userToken");
        navigate("/login", { replace: true });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isVerified) {
    return null; // Prevent rendering children if not verified
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
