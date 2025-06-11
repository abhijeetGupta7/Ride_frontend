import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import UserLogoutButton from "../components/UserLogoutButton";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

const Profile = () => {
  const { user } = useContext(UserDataContext);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
    
        <div className="flex items-center justify-between px-2">
          <Link to={"/"}>
            <h1 className="text-2xl font-extrabold text-blue-700 pb-4">Ridee</h1>
          </Link>

          <BackButton />
        </div>
      
      {/* Profile Header */}
      <div className="bg-blue-600 text-white p-6 rounded-b-3xl shadow-md flex flex-col sm:flex-row items-center sm:justify-start gap-4 max-w-3xl mx-auto">
        <div className="bg-white p-3 rounded-full">
          <FiUser className="text-blue-600 text-3xl" />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {user?.fullname?.firstname} {user?.fullname?.lastname}
          </h1>
          <p className="text-blue-100 text-sm sm:text-base">{user?.email}</p>
        </div>
      </div>

      {/* Account Info */}
      <div className="max-w-3xl mx-auto mt-6 bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold flex items-center">
          <FiUser className="mr-2" /> Account Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">First Name</p>
            <p className="font-medium">{user?.fullname?.firstname || "Not provided"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Name</p>
            <p className="font-medium">{user?.fullname?.lastname || "Not provided"}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Ride History 
        Later we will add
      */}
    
      {/* Logout Button */}
      <div className="max-w-3xl mx-auto mt-6">
        <UserLogoutButton className="w-full" />
      </div>
    </div>
  );
};

export default Profile;
