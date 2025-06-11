import { useNavigate } from "react-router-dom";

const UserLogoutButton = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`bg-red-100 text-red-600 hover:bg-red-200 py-3 rounded-xl font-medium flex items-center justify-center ${className}`}
    >
      Logout
    </button>
  );
};

export default UserLogoutButton;
