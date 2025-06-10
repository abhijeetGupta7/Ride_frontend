import { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios, { HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({ children }) => {
    const { captain, setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect( () => {
        const captainToken=localStorage.getItem('captainToken');

        // Verify captain by calling profile endpoint
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/captain/profile`, {
            withCredentials: true, // Include cookies in request
            headers: {
                Authorization: `Bearer ${captainToken}`
            }
        })
        .then( (response) => {
            if(response.status === HttpStatusCode.Ok) {
                const data = response.data.data;
                
                setCaptain({
                    fullname: {
                        firstname: data.fullname.firstname,
                        lastname: data.fullname.lastname || ''
                    },
                    email: data.email,
                    vehicle: {
                        color: data.vehicle.color,
                        plate: data.vehicle.plate,
                        capacity: data.vehicle.capacity,
                        vehicleType: data.vehicle.vehicleType
                    },
                    id:data._id
                });
            }
        })
        .catch( (error) => {
            console.error("Authentication error:", error);
            localStorage.removeItem("captainToken");
            setCaptain(null); // Clear captain context
            navigate("/captain-login"); // Redirect to login
        })
        .finally( () => {
            setLoading(false); // Hide loader once done
        });
    }, [navigate, setCaptain]);

    // Show loading indicator while verifying captain
    if(isLoading) {
        return <div>Loading...</div>; // Show loading indicator while verifying captain
    }

    return (
        <>
            {children} {/* Render protected children if authenticated */}
        </>
    );
}

export default CaptainProtectedWrapper;