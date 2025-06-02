import { useEffect } from "react";
import { FaStar } from "react-icons/fa";

export default function DriverComingPanel({
  driverDetails,
  onCancel,
  setDriverStatus
}) {
  // Mock timer for demo - replace with real tracking in production
  useEffect(() => {
    const timer = setTimeout(() => {
      setDriverStatus('arrived');
    }, 3000); // Simulate 30 sec arrival
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="z-60 absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Driver is coming</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {driverDetails.eta} away
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
          <p className="font-semibold">{driverDetails.name}</p>
          <div className="flex items-center">
            <FaStar className="w-4 h-4 text-yellow-500" />
            <span className="ml-1 text-sm">{driverDetails.rating}</span>
          </div>
          <p className="text-sm text-gray-600">
            {driverDetails.vehicle} · {driverDetails.plateNumber}
          </p>
        </div>
      </div>

      {/* Progress Visualization */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full mb-2">
          <div 
            className="h-full bg-green-500 rounded-full animate-pulse"
            style={{ width: '75%' }} // Update dynamically with real ETA
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Driver is on the way</span>
          <span>{driverDetails.distance} remaining</span>
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