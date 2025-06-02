import TopBar from "../components/TopBar";

function CaptainRiding() {
  return (
    <div className="h-screen relative bg-gray-100">
        
        <TopBar/> 

      {/* Map Section */}
      <div className="h-2/3 w-full bg-gray-500 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Live Map View</div>
      </div>

      {/* Ride Info Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Current Ride</h2>
            <div className="flex items-center mt-1">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm text-gray-600">In progress</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">3 km</p>
            <p className="text-sm text-gray-500">remaining</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-px h-8 bg-gray-300 mx-auto"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-medium text-gray-900">123 Main Street, Downtown</p>
            </div>
          </div>
        </div>

        <button className="w-full py-4 bg-green-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition duration-200">
          Complete Ride
        </button>
      </div>
    </div>
  );
}

export default CaptainRiding;