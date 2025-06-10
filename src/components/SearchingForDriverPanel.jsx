import { IoArrowBackCircleOutline } from "react-icons/io5";
import { BeatLoader } from "react-spinners";

const SearchingForDriverPanel = ({
  waitingPanelRef,
  pickup,
  destination,
  selectedVehicle,
  cancelSearch,
}) => (
  <div
    ref={waitingPanelRef}
    className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl p-0 sm:p-0 z-50 transition-all duration-300 flex flex-col"
    style={{ maxHeight: "60h" }}
  >
    {/* Panel Content */}
    <div className="flex-1 overflow-y-auto p-5 sm:p-6">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mb-7">
          <div className="mb-2">
            <BeatLoader color="#16a34a" size={16} />
          </div>
          <h2 className="text-xl font-bold mt-2 text-gray-800 text-center">
            Searching for a driver...
          </h2>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Hang tight! We're finding the best match for your ride.
          </p>
        </div>
        <div className="w-full max-w-md mx-auto mb-5">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start border-b pb-2">
              <span className="text-gray-500 text-sm">Pickup:</span>
              <span className="font-medium text-sm text-right break-words max-w-[70%]">
                {pickup}
              </span>
            </div>
            <div className="flex justify-between items-start border-b pb-2">
              <span className="text-gray-500 text-sm">Destination:</span>
              <span className="font-medium text-sm text-right break-words max-w-[70%]">
                {destination}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500 text-sm">Fare:</span>
              <span className="font-bold text-green-700 text-base">
                ₹{selectedVehicle?.fare ?? selectedVehicle?.price ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 bg-white">
      <button
        onClick={cancelSearch}
        className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-semibold shadow transition-colors duration-200 text-sm"
      >
        <IoArrowBackCircleOutline className="mr-2" size={22} />
        Cancel request
      </button>
    </div>
  </div>
);

export default SearchingForDriverPanel;