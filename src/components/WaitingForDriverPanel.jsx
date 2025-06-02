import { BeatLoader } from "react-spinners";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const WaitingForDriverPanel = ({
  waitingPanelRef,
  driverFound,
  pickup,
  destination,
  selectedVehicle,
  driverDetails,
  cancelSearch,
  setDriverStatus,
}) => (
  <div
    ref={waitingPanelRef}
    className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl p-6 z-50"
    style={{ height: '50vh' }}
  >
    {!driverFound ? (
      // Searching for driver state
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mb-8">
          <BeatLoader color="#3B82F6" size={15} />
          <h2 className="text-xl font-bold mt-4">Finding your driver</h2>
        </div>
        <div className="w-full mb-6">
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Pickup:</span>
            <span className="font-medium">{pickup}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-gray-500">Destination:</span>
            <span className="font-medium">{destination}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Fare:</span>
            <span className="font-bold">₹{selectedVehicle?.price}</span>
          </div>
        </div>
        <button
          onClick={cancelSearch}
          className="flex items-center text-red-500 font-medium"
        >
          <IoArrowBackCircleOutline className="mr-2" size={20} />
          Cancel request
        </button>
      </div>
    ) : (
      // Driver found state
      <div className="h-full flex flex-col">
        <div className="flex justify-between px-5">
          <h2 className="text-xl font-bold mb-4">Driver found!</h2>
          <button className="relative bottom-2 text-base font-bold text-red-500 cursor-pointer"
            onClick={cancelSearch}
          >
            Ignore
          </button>
        </div>
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <img
              src={selectedVehicle.image}
              alt={driverDetails.vehicle}
              className="w-12 h-12"
            />
          </div>
          <div>
            <p className="font-bold">{driverDetails.name}</p>
            <p className="text-gray-600">
              ⭐ {driverDetails.rating} • {driverDetails.plateNumber}
            </p>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg mb-4">
          <p className="font-semibold">
            ETA: {driverDetails.eta} • {driverDetails.distance}
          </p>
        </div>
        {/* Driver location */}
        <div className="bg-gray-200 rounded-lg flex-1 mb-4 flex items-center justify-center">
          <p>Driver location would appear here</p>
        </div>
        <button className="w-full bg-black text-white py-3 rounded-xl font-bold"
          onClick={()=>
             setDriverStatus('coming')
            }
        >
          Confirm Ride
        </button>
      </div>
    )}
  </div>
);

export default WaitingForDriverPanel;