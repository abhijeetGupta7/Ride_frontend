

function Riding() {
  return (
    <div className="relative h-screen flex flex-col bg-gray-100">
      {/* Map Section */}
      <div className="h-1/2 bg-gray-400 flex items-center justify-center text-white text-2xl font-bold">
        Map
      </div>

      {/* Info Panel */}
      <div className="flex flex-col items-center justify-center px-2">
    
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-3 space-y-4 ">
          
          {/* Driver Info */}
          <div className="flex items-center space-x-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              alt="Driver"
              className="w-20 h-20 rounded-full border-2 border-gray-300 mr-5"
            />
            <div>
              <h2 className="text-lg font-bold">Driver Name</h2>
              <p className="text-gray-600">Plate: <span className="font-medium">DL5SAB1234</span></p>
              <p className="text-gray-600">Vehicle: <span className="font-medium">Car</span></p>
            </div>
          </div>

          {/* Destination */}
          <div className="border-t pt-2">
            <p className="text-sm text-gray-500">Destination</p>
            <h3 className="text-lg font-semibold">Patan Durbar Square</h3>
          </div>

          {/* Fare */}
          <div className="border-t pt-2">
            <p className="text-sm text-gray-500">Cash</p>
            <h3 className="text-lg font-semibold">₹400</h3>
          </div>

          {/* Payment Button */}
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition">
            Make Payment
          </button>

        </div>
      </div>
    </div>
  );
}

export default Riding;