import { FaMapMarkerAlt } from "react-icons/fa";

// Main panel for selecting pickup and destination, and finding a trip
const MainLocationPanel = ({
  pickup,
  destination,
  onPickupClick,
  onDestinationClick,
  onFindTrip,
}) => (
  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl p-4 z-20">
    {/* Panel Title */}
    <h2 className="text-xl font-bold mb-4">Where to ?</h2>
    
    {/* Location Selectors */}
    <div className="space-y-3 mb-6">
      
      {/* Pickup Selector */}
      <div
        className="bg-gray-50 flex items-center p-4 rounded-xl cursor-pointer"
        onClick={onPickupClick}
      >
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <FaMapMarkerAlt className="text-blue-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Pickup</p>
          <p className="font-medium">
            {pickup || "Select Pickup location"}
          </p>
        </div>
      </div>
      
      {/* Destination Selector */}
      <div
        className="bg-gray-50 flex items-center p-4 rounded-xl cursor-pointer"
        onClick={onDestinationClick}
      >
        <div className="bg-red-100 p-2 rounded-full mr-3">
          <FaMapMarkerAlt className="text-red-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500">Destination</p>
          <p className="font-medium">
            {destination || "Select Destination location"}
          </p>
        </div>
      </div>
    </div>
    
    {/* Find Trip Button */}
    <button
      className="w-full bg-black text-white py-3 rounded-xl font-bold disabled:opacity-50"
      disabled={!pickup || !destination}
      onClick={onFindTrip}
    >
      Find Trip
    </button>
  </div>
);

export default MainLocationPanel;