import { useEffect } from "react";
import { FaStar } from "react-icons/fa";

export default function DriverComingPanel({
  rideDetails,
  onCancel,
}) {

  const driverName = rideDetails?.user?.fullname
    ? `${rideDetails.user.fullname.firstname} ${rideDetails.user.fullname.lastname || ""}`
    : rideDetails?.user?.email || "Driver";
  const vehicleType = rideDetails?.vehicleType?.toUpperCase() || "Vehicle";
  const plateNumber = rideDetails?.user?.vehicle?.plate || "N/A";
  const email = rideDetails?.user?.email || "N/A";
  const pickup = rideDetails?.pickup?.address || "Pickup Location";
  const destination = rideDetails?.destination?.address || "Destination";
  const fare = rideDetails?.fare || "N/A";
  const currency = rideDetails?.paymentDetails?.currency || "INR";
  const distance = rideDetails?.distance ? `${rideDetails.distance} km` : "";
  const duration = rideDetails?.duration ? `${rideDetails.duration} min` : "";
  const otp = rideDetails?.otp || "N/A";

  return (
    <div className="z-60 absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Driver is coming</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {duration} away
        </span>
      </div>

      {/* Driver Card */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/42.jpg"
          className="w-16 h-16 rounded-full border-2 border-green-500"
          alt="Driver"
        />
        <div>
          <p className="font-semibold">{driverName}</p>
          <div className="flex items-center">
            <FaStar className="w-4 h-4 text-yellow-500" />
            <span className="ml-1 text-sm">5.0</span>
          </div>
          <p className="text-sm text-gray-600">
            {vehicleType} · Plate: {plateNumber}
          </p>
          <p className="text-sm text-gray-600">Email: {email}</p>
        </div>
      </div>

      {/* Ride Info */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Pickup:</span>
          <span className="font-medium text-right max-w-[60%] break-words">
            {pickup}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Destination:</span>
          <span className="font-medium text-right max-w-[60%] break-words">
            {destination}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Fare:</span>
          <span className="font-bold text-green-700">
            ₹{fare} {currency}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Distance:</span>
          <span>{distance}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>OTP:</span>
          <span className="font-bold text-blue-700 tracking-widest text-lg">
            {otp}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 bg-red-100 text-red-600 rounded-lg font-medium"
        >
          Cancel Ride
        </button>
      </div>
    </div>
  );
}