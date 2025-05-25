import axios from "axios";

export const logoutCaptain = async () => {
    const captainToken = localStorage.getItem('captainToken');

    try {
        const response=await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/captain/logout`,
            {}, // no request body needed, but axios POST requires this param
            {
                headers: {
                    Authorization: `Bearer ${captainToken}`,
                },
                withCredentials: true,
            }
        );

        if(response.status===200) {
            localStorage.removeItem('captainToken');
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (error) {
        console.error("Logout failed:", error);
        return { success: false, error };
    }
};

