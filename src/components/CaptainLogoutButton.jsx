import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutCaptain } from '../utils/logoutCaptain';

const CaptainLogoutButton = ({className}) => {
    
    const navigate=useNavigate();

    const handleLogout = async () => {
        const response= await logoutCaptain();
        if(response.success) {
            navigate('/captain-login');
        }
    }

    return (
   <button
      onClick={handleLogout}
      className={`bg-red-100 text-red-600 hover:bg-red-200 py-3 rounded-xl font-medium flex items-center justify-center ${className}`}
    >
      Logout
    </button>  )
}


export default CaptainLogoutButton;