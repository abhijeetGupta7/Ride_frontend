import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import axios, { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const userToken = localStorage.getItem("userToken"); 

    // Verify user by calling profile endpoint
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/profile`, {
        withCredentials: true, // Include cookies in request
        headers: userToken ? { Authorization: `Bearer ${userToken}` } : {}, // Include auth header if token exists
      })
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          const data = response.data.data;
        
          // Set user data to context
          setUser({
            email: data.email,
            fullname: data.fullname,
          });
        }
      })
      .catch((err) => {
        // If error occurs (unauthorized, token expired, etc.)
        console.error("Authentication error:", err);
        setUser(null); // Clear user context
        localStorage.removeItem("userToken"); 
        navigate("/login"); 
      })
      .finally(() => {
        // Hide loader once done (success or fail)
        setIsLoading(false);
      });
  }, [navigate, setUser]);

  // Show loading indicator while verifying user
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If authenticated, render protected children
  return <>{children}</>;
};

export default UserProtectedWrapper;
