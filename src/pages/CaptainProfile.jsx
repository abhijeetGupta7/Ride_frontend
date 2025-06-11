import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import CaptainLogoutButton from "../components/CaptainLogoutButton";
import { FiUser, FiTruck } from "react-icons/fi";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";

export default function CaptainProfile() {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      
        <div className="flex items-center justify-between px-2">
          <Link to={"/"}>
            <h1 className="text-2xl font-extrabold text-blue-700 pb-4">Ridee</h1>
          </Link>

          <BackButton />
        </div>

      {/* Profile Header */}
      <div className="bg-blue-600 text-white rounded-b-3xl shadow-md p-6 max-w-2xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-full">
            <FiUser className="text-blue-600 text-3xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {captain?.fullname?.firstname} {captain?.fullname?.lastname}
            </h1>
            <p className="text-blue-100 text-sm">{captain?.email}</p>
          </div>
        </div>
      </div>

      {/* Captain & Vehicle Info */}
      <div className="mt-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FiTruck className="mr-2" /> Vehicle Information
        </h2>
        <div className="space-y-2">
          <div>
            <p className="text-sm text-gray-500">Vehicle Type</p>
            <p className="font-medium">
              {captain?.vehicle?.vehicleType || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Plate Number</p>
            <p className="font-medium">{captain?.vehicle?.plate || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Color</p>
            <p className="font-medium">{captain?.vehicle?.color || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Seating Capacity</p>
            <p className="font-medium">
              {captain?.vehicle?.capacity || "N/A"} persons
            </p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-6 max-w-2xl mx-auto">
        <CaptainLogoutButton className="w-full bg-red-100 text-red-600 hover:bg-red-200 py-3 rounded-xl font-medium flex items-center justify-center" />
      </div>
    </div>
  );
}
