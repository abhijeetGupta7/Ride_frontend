import axios from "axios";

export const logoutUser = async () => {
  const userToken = localStorage.getItem("userToken");

  
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/user/logout`,
      {}, // no request body needed, but axios POST requires this param
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        withCredentials: true, 
      }
    );

    if (response.status === 200) {
      localStorage.removeItem("userToken");
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Logout failed:", error);
    return { success: false, error };
  }
};
