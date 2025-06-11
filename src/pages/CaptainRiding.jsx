import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { FaUser, FaMoneyBillWave, FaCar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { finishRide } from "../apis/map.api";
import LiveTracking from "../components/LiveTracking";

function CaptainRiding() {
  const { state } = useLocation();
  const { rideDetails } = state || {};
  const navigate = useNavigate();

  const {
    pickup,
    destination,
    distance,
    duration,
    fare,
    paymentDetails,
    user,
    status,
  } = rideDetails || {};

  const passengerName = user?.fullname
    ? `${user.fullname.firstname} ${user.fullname.lastname || ""}`.trim()
    : user?.email || "Passenger";

  const pickupAddress = pickup?.address || "Pickup Location";
  const destinationAddress = destination?.address || "Destination";
  const distanceKm = distance ? `${distance.toFixed(1)} km` : "N/A";
  const durationMin = duration ? `${duration} min` : "--";
  const rideFare = fare
    ? `${paymentDetails?.currency || "INR"} ${fare}`
    : "N/A";
  const rideStatus = status || "unknown";

  const finishRideHandler = async () => {
    try {
      const repsonse = await finishRide({ rideId: rideDetails._id });
      navigate("/captain-home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen relative bg-gray-100">
      <TopBar />

      {/* Map Section */}
      <LiveTracking />

      {/* Ride Info Panel */}
      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FaCar className="mr-2 text-blue-600" />
              Current Ride
            </h2>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <span
                className={`w-3 h-3 rounded-full mr-2 ${
                  rideStatus === "pending" ? "bg-yellow-500" : "bg-green-500"
                }`}
              ></span>
              <span className="capitalize">{rideStatus}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">{distanceKm}</p>
            <p className="text-sm text-gray-500">{durationMin} left</p>
          </div>
        </div>

        {/* Passenger & Route Info */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            <div className="bg-gray-200 p-3 rounded-full mr-3">
              <FaUser className="text-gray-600 text-xl" />
            </div>
            <div>
              <p className="font-semibold">{passengerName}</p>
            </div>
          </div>

          {/* Route */}
          <div className="space-y-3">
            <div className="flex items-start">
              <IoLocationSharp className="text-green-500 mt-1 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Pickup</p>
                <p className="font-medium">{pickupAddress}</p>
              </div>
            </div>
            <div className="flex items-start">
              <IoLocationSharp className="text-red-500 mt-1 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Destination</p>
                <p className="font-medium">{destinationAddress}</p>
              </div>
            </div>
          </div>

          {/* Fare Info */}
          <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center">
              <FaMoneyBillWave className="text-blue-600 mr-2" />
              <span className="text-gray-700">Estimated Fare</span>
            </div>
            <span className="font-bold text-lg">{rideFare}</span>
          </div>
        </div>

        {/* Finish Ride Button */}
        <button
          className="w-full py-3 text-xl bg-green-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition duration-200"
          onClick={finishRideHandler}
        >
          Finish Ride
        </button>
      </div>
    </div>
  );
}

export default CaptainRiding;
