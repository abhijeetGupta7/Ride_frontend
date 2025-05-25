import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutCaptain } from '../utils/logoutCaptain';

const CaptainLogoutButton = () => {
    
    const navigate=useNavigate();

    const handleLogout = async () => {
        const response= await logoutCaptain();
        if(response.success) {
            navigate('/captain-login');
        }
    }

    return (
    <button className="bg-amber-200 p-3" onClick={handleLogout}> Logout Captain </button>
  )
}


export default CaptainLogoutButton;