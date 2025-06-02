import { IoArrowBackCircleOutline } from "react-icons/io5";

const VehicleSelectionPanel = ({
  vehicles,
  selectedVehicle,
  onVehicleSelect,
  onClose,
  vehiclePanelRef,
  onConfirm
}) => (
  <div
    ref={vehiclePanelRef}
    className="fixed bottom-0 left-0 right-0 bg-white z-40 rounded-t-3xl shadow-2xl transform translate-y-full flex flex-col"
    style={{ height: '65vh' }}
  >
    <div className="p-5 flex-1 flex flex-col">
      {/* Panel header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Choose Your Ride</h2>
        <button
          onClick={onClose}
          className="text-2xl text-gray-500"
        >
          <IoArrowBackCircleOutline />
        </button>
      </div>

      {/* Vehicle list */}
      <div className="space-y-3 overflow-y-auto flex-1" style={{ maxHeight: '40vh' }}>
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => onVehicleSelect(vehicle)}
            className={`p-4 border rounded-xl flex items-center justify-between ${
              vehicle.available
                ? selectedVehicle?.id === vehicle.id
                  ? 'border-2 border-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50 cursor-pointer'
                : 'opacity-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <img
                src={vehicle.image}
                alt={vehicle.type}
                className="w-16 h-16 object-contain"
              />
              <div>
                <p className="font-semibold">{vehicle.type}</p>
                <p className="text-sm text-gray-500">{vehicle.eta} away</p>
                {!vehicle.available && (
                  <p className="text-xs text-red-500">Not available</p>
                )}
              </div>
            </div>
            <p className="font-bold">Rs. {vehicle.price}</p>
          </div>
        ))}
      </div>

      {/* Confirm button */}
      {selectedVehicle && (
        <div className="pt-4 border-t mt-4">
          <button
            className="w-full bg-black text-white py-3 rounded-xl font-bold"
            onClick={onConfirm}
          >
            Confirm {selectedVehicle.type} (Rs. {selectedVehicle.price})
          </button>
        </div>
      )}
    </div>
  </div>
);

export default VehicleSelectionPanel;