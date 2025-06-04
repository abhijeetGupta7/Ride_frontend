import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

function DriverDetails() {

  const { captain } = useContext(CaptainDataContext);

  return (

        <div className="flex flex-col items-center justify-center px-2">
    
        <div className="rounded-3xl shadow-xl w-full max-w-md p-3 space-y-4">
          
          {/* Driver Info:  Make a componenet fo this */}  
          <div className="flex items-center space-x-2"> 
            <img
              src="https://th.bing.com/th/id/OIP.Xb1aKpWnaP0v2eKYZBsxWgHaHa?w=173&h=180&c=7&r=0&o=5&pid=1.7"
              alt="Driver"
              className="w-20 h-20 rounded-full border-2 border-gray-300 mr-5"
            />
            <div>
              <h2 className="text-lg font-bold">{`${captain.fullname.firstname} ${captain.fullname.lastname} `}</h2>
              <p className="text-gray-600">Email: <span className="font-medium"> {captain.email} </span></p>
              <p className="text-gray-600">Plate: <span className="font-medium"> {captain.vehicle.plate} </span></p>
              <p className="text-gray-600">Vehicle Type: <span className="font-medium">{captain.vehicle.vehicleType.toUpperCase()}</span></p>
              <p className="text-gray-600">Vehicle Color: <span className="font-medium">{captain.vehicle.color}</span></p>
              <p className="text-gray-600">Vehicle Capacity: <span className="font-medium">{captain.vehicle.capacity}</span></p>
            </div>
          </div>

        </div>
      </div>
    
  )
}

export default DriverDetails
