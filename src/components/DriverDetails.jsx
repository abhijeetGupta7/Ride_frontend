
function DriverDetails() {
  return (

        <div className="flex flex-col items-center justify-center px-2">
    
        <div className="rounded-3xl shadow-xl w-full max-w-md p-3 space-y-4">
          
          {/* Driver Info:  Make a componenet fo this */}  
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

        </div>
      </div>
    
  )
}

export default DriverDetails
