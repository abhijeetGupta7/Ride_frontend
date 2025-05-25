import axios, { HttpStatusCode } from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

function CaptainRegister() {
  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  
  // Access global captain context
  const {captain,setCaptain}=useContext(CaptainDataContext);
  const navigate=useNavigate();

  // Handles form submission
  const submitHandler = async(e) => {
    e.preventDefault();

    const requestData = {
      fullname: {
        firstname: firstName,
        lastname: lastName || undefined
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity: parseInt(capacity),
        vehicleType
      }
    };

    try {
      // Send POST request to register captain
      const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/captain/register`, requestData, {
        withCredentials:true
      });
      console.log("Response:", response.data);
      if(response.status===HttpStatusCode.Created) {
        const data=response.data.data.captain
        const captainData={
          fullname:{
            firstname:data.fullname.firstname,
            lastname:data.fullname.lastname ? data.fullname.lastname : ''
          },
          email:data.email,
          vehicle:{
            color:data.vehicle.color,
            plate:data.vehicle.plate,
            capacity:data.vehicle.capacity,
            vehicleType:data.vehicle.vehicleType
          }
        }
        setCaptain(captainData); 
        localStorage.setItem("captainToken", response.data.token);
        console.log("Registration successful:", response.data);
        navigate('/captain-profile');
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Clear input fields after submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setColor("");
      setPlate("");
      setCapacity("");
      setVehicleType("car");
    }
  };

  return (
    
    <div className="min-h-screen flex flex-col justify-between items-center p-6 sm:p-8 bg-gray-50">
      
      {/* Header & intro */}
      <div className="flex flex-col items-center w-full max-w-md">
        <h1 className="text-5xl font-bold text-green-700 pt-5 tracking-widest mb-1 flex items-center gap-2">
          Ridee <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Captain</span>
        </h1>
        <p className="text-sm text-gray-500 font-medium mb-6 mt-1">Start driving with Ridee</p>

        {/* Registration Form */}
        <form onSubmit={submitHandler} className="w-full space-y-6">

          <div>
            {/* Name input */}
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Your name</label>
            <div className="flex flex-row gap-2">
              <input
                type="text"
                placeholder="First name"
                required
                minLength={3}
                className="w-1/2 rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-green-600"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last name (optional)"
                minLength={3}
                className="w-1/2 rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-green-600"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div>
            {/* Email */}
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Email</label>
            <input
              required
              type="email"
              placeholder="email@example.com"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            {/* Password */}
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Password</label>
            <input
              required
              type="password"
              placeholder="Minimum 6 characters"
              minLength={6}
              className="w-full rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <hr className="border-t border-gray-300" />

          {/* Vehicle Info */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Vehicle Info</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Color"
                className="rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-green-600"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="Plate"
                className="rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-green-600"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
              />
              <input
                type="number"
                required
                min={1}
                placeholder="Capacity"
                className="rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-green-600"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
              <select
                required
                className="rounded-lg bg-gray-200 px-4 py-2 text-base outline-none focus:ring-2 focus:ring-green-600"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold rounded-lg py-2 hover:bg-green-800 transition-colors duration-200 text-lg"
          >
            Register
          </button>
        </form>

        {/* Link to login */}
        <p className="mt-6 text-sm sm:text-base font-medium">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-green-700 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>

      {/* Alternate user registration button */}
      <div className="w-full max-w-md mt-10 mb-6">
        <Link to="/register">
          <button className="w-full border border-gray-700 text-gray-800 font-semibold rounded-lg py-2 text-lg hover:bg-gray-800 hover:text-white transition-colors duration-200">
            Register as User
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CaptainRegister;
