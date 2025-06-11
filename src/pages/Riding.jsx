import { useLocation, useNavigate } from "react-router-dom";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import TopBar from "../components/TopBar";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

function Riding() {
  const { state } = useLocation();
  const { rideDetails } = state || {};
  const [paymentDone, setPaymentDone] = useState(false);
  const navigate = useNavigate();

  const paymentDoneRef = useRef(paymentDone);

  const { pickup, destination, fare, paymentDetails, vehicleType, captain } =
    rideDetails || {};

  const captainName = captain?.fullname
    ? `${captain.fullname.firstname} ${captain.fullname.lastname}`.trim()
    : "Driver";

  const vehiclePlate = captain?.vehicle?.plate || "N/A";
  const vehicle = captain?.vehicle?.vehicleType || vehicleType || "Vehicle";
  const pickupAddress = pickup?.address || "Pickup Location";
  const destinationAddress = destination?.address || "Destination";
  const currency = paymentDetails?.currency || "₹";
  const fareDisplay = fare ? `${currency} ${fare}` : "--";

  const socket = useContext(SocketContext);

  useEffect(() => {
    paymentDoneRef.current = paymentDone;
  }, [paymentDone]);

  useEffect(() => {
    const rideCompletedHandler = (data) => {
      console.log("is payment done: ", paymentDone);
      if (paymentDoneRef.current) {
        console.log("ride ended", data);
        navigate("/feedback", {
          state: {
            rideDetails: data,
          },
        });
      }
    };

    socket.on("ride-completed", rideCompletedHandler);
    return () => socket.off("ride-completed", rideCompletedHandler);
  }, [socket]);

  const paymentHandler = () => {
    try {
      // later on we can add payment gateway
      const result = true; // await makePayment();
      if (result) {
        setPaymentDone(true);
        // Notify backend via socket or API if needed
        // Optionally show a toast or animation here
      }
    } catch (err) {
      console.error("Payment failed", err);
      // error message can be shown
    }
  };

  return (
    <div className="h-screen relative bg-gray-100">
      <TopBar role={'user'} />

      {/* Map Section */}
      <LiveTracking />

      {/* Ride Info Panel */}
      <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-xl p-3">
        {/* Driver Info */}
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
            alt="Driver"
            className="w-20 h-20 rounded-full border-2 border-gray-300"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              {captainName}
            </h2>
            <p className="text-gray-600">
              Plate: <span className="font-medium">{vehiclePlate}</span>
            </p>
            <p className="text-gray-600">
              Vehicle: <span className="font-medium">{vehicle}</span>
            </p>
          </div>
        </div>

        {/* Pickup & Destination */}
        <div className="space-y-2 mb-4">
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
        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg mb-6">
          <div className="flex items-center text-gray-700">
            <FaMoneyBillWave className="mr-2 text-blue-600" />
            Cash Fare
          </div>
          <span className="font-bold text-lg">{fareDisplay}</span>
        </div>

        {/* Payment Button */}
        <button
          disabled={paymentDone}
          className={`w-full py-3 text-xl font-bold rounded-xl shadow-md transition duration-200 ${
            paymentDone
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-blue-500 text-white"
          }`}
          onClick={paymentHandler}
        >
          {paymentDone ? "Payment Done" : "Make Payment"}
        </button>
      </div>
    </div>
  );
}

export default Riding;
