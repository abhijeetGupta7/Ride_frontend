import { useEffect } from "react"
import { logoutUser } from "../utils/logoutUser"
import { useNavigate } from "react-router-dom"

const UserLogout = () => {
    const navigate=useNavigate();
    useEffect( () => {
        const doLogout =  async () => {
            const result=await logoutUser();
            if(result.success) {
                navigate('/login');
            }
        }

        doLogout();

    }, [navigate]);

    return (
        <div> Logging you out ...</div>
    )    
}

export default UserLogout;