import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/logoutUser";


const UserLogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logoutUser()
    if (result.success) {
      navigate("/login");
    }
  };

  return <button className="bg-amber-200 p-4" onClick={handleLogout}>Logout</button>;
};

export default UserLogoutButton;
