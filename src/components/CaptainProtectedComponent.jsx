import { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios, { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({ children }) => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const captainToken = localStorage.getItem("captainToken");

    if (!captainToken) {
      navigate("/captain-login", { replace: true });
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/captain/profile`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${captainToken}`,
        },
      })
      .then((response) => {
        if (response.status === HttpStatusCode.Ok) {
          const data = response.data.data;

          setCaptain({
            fullname: {
              firstname: data.fullname.firstname,
              lastname: data.fullname.lastname || "",
            },
            email: data.email,
            vehicle: {
              color: data.vehicle.color,
              plate: data.vehicle.plate,
              capacity: data.vehicle.capacity,
              vehicleType: data.vehicle.vehicleType,
            },
            id: data._id,
          });

          setIsVerified(true);
        }
      })
      .catch((error) => {
        console.error("Authentication error:", error);
        localStorage.removeItem("captainToken");
        setCaptain(null);
        navigate("/captain-login", { replace: true });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isVerified) {
    return null; // Prevent rendering children if not verified
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;
