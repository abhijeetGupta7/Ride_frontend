import { CgProfile } from "react-icons/cg";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/logoutUser";
import { logoutCaptain } from "../utils/logoutCaptain";

const TopBar = ({role}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when we click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    if(role=='user') {
        navigate("/profile");
        setIsOpen(false);
    } else if(role=='captain') {
        navigate("/captain-profile");
        setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    if (role == "user") {
      const result = await logoutUser();
      if (result.success) {
        navigate("/login");
        setIsOpen(false);
      }
    } else if (role == "captain") {
      const result = await logoutCaptain();
      if (result.success) {
        navigate("/captain-login");
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="absolute top-5 left-0 w-full px-5 z-10 flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="text-2xl font-extrabold text-black">Ridee</h1>
        </Link>

        {/* Profile Icon with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Profile menu"
          >
            <CgProfile className="text-4xl text-black cursor-pointer hover:text-blue-700 transition-colors" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <button
                onClick={handleProfileClick}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopBar;
