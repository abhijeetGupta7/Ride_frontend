import {
  FaUser,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { confirmRide } from "../apis/map.api";

function ConfirmRidePanel({
  ride,
  setRide,
  ref,
  setRidePopUpPanel,
  setConfirmRidePanel,
}) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const confirmRideHandler = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Confirming ride with OTP:", otp);
      const response=await confirmRide({ rideId: ride._id, otp });
      const rideDetails=response.data.data;
      setRide(rideDetails);
      setConfirmRidePanel(false);
      setRidePopUpPanel(false);
      navigate("/captain-riding", {
        state: {
          rideDetails: ride
        }
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to confirm ride. Please check OTP and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const passengerName = ride?.user?.fullname
    ? `${ride.user.fullname.firstname} ${
        ride.user.fullname.lastname || ""
      }`.trim()
    : ride?.user?.email || "Passenger Name";
  const distance = ride?.distance ? `${ride.distance} km` : "N/A";
  const pickup = ride?.pickup?.address || "Pickup Location";
  const destination = ride?.destination?.address || "Destination";
  const fare = ride?.fare || "N/A";
  const currency = ride?.paymentDetails?.currency || "INR";

  return (
    <div className="fixed bottom-0 w-full" ref={ref}>
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white">
          <h1 className="text-xl font-bold flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            Confirm Ride
          </h1>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Passenger Info */}
          <div className="flex items-center mb-4">
            <div className="bg-gray-200 p-3 rounded-full mr-3">
              <FaUser className="text-gray-600 text-xl" />
            </div>
            <div>
              <p className="font-semibold">{passengerName}</p>
              <div className="flex items-center text-sm text-gray-600">
                <span className="flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-xs" />
                  {distance} away
                </span>
              </div>
            </div>
          </div>

          {/* Route Info */}
          <div className="space-y-3 mb-4">
            <div className="flex items-start">
              <IoLocationSharp className="text-green-500 mt-1 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Pickup Location</p>
                <p className="font-medium">{pickup}</p>
              </div>
            </div>
            <div className="flex items-start">
              <IoLocationSharp className="text-red-500 mt-1 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Destination</p>
                <p className="font-medium">{destination}</p>
              </div>
            </div>
          </div>

          {/* Fare */}
          <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg mb-4">
            <div className="flex items-center">
              <FaMoneyBillWave className="text-blue-600 mr-2" />
              <span className="text-gray-700">Fare</span>
            </div>
            <span className="font-bold text-lg">
              {currency} {fare}
            </span>
          </div>

          {/* OTP Input */}
          <div className="bg-gray-100 px-6 py-4 rounded-2xl mb-6 flex flex-col items-center">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              maxLength={6}
              className="w-32 text-center tracking-widest text-lg font-bold border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="------"
              autoFocus
              inputMode="numeric"
              pattern="[0-9]*"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="text-red-600 text-center mb-2">{error}</div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setConfirmRidePanel(false);
              }}
              className="flex-1 flex items-center justify-center py-3 bg-red-100 text-red-600 rounded-lg font-medium"
              disabled={loading}
            >
              <FaTimes className="mr-2" />
              Decline
            </button>

            <button
              onClick={confirmRideHandler}
              className="flex-1 flex items-center justify-center py-3 bg-green-600 text-white rounded-lg font-medium"
              disabled={loading || otp.length !== 6}
            >
              <FaCheck className="mr-2" />
              {loading ? "Confirming..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmRidePanel;
