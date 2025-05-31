import axios, { HttpStatusCode } from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

function CaptainLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [error, setError] = useState(null); 

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const submittedData = {
      email,
      password
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/captain/login`, 
        submittedData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = response.data.data.captain;
        const captainInfo = {
          fullname: {
            firstname: data.fullname.firstname,
            lastname: data.fullname.lastname || ''
          },
          email: data.email,
          vehicle: {
            color: data.vehicle.color,
            plate: data.vehicle.plate,
            capacity: data.vehicle.capacity,
            vehicleType: data.vehicle.vehicleType
          }
        };
        
        setCaptain(captainInfo);
        localStorage.setItem('captainToken', response.data.token);
        navigate("/captain-profile");
      }
    } catch (error) {
      // Add user-friendly error handling here
      console.log(`login failed`,error);
      if (error.status === HttpStatusCode.Unauthorized) {
        setError("Invalid email or password.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } 
  };
    


  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-6 sm:p-8 bg-gray-50">
      
      <div className="flex flex-col items-center w-full max-w-md">
        
        {/* Header with badge */}
        <h1 className="text-5xl font-bold text-green-700 pt-5 tracking-widest mb-1 flex items-center gap-2">
          Ridee <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">Captain</span>
        </h1>
        <p className="text-sm text-gray-500 font-medium mt-1 mb-6">For verified captains only</p>
        
        {/* Login Form */}
        <form onSubmit={submitHandler} className="w-full space-y-6">
          <div>
            <label htmlFor="captainEmail" className="block text-base sm:text-lg font-medium text-gray-700 mb-1">
              What's your email?
            </label>
            <input 
              required
              type="email"
              id="captainEmail"
              placeholder="email@example.com"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 text-base sm:text-lg placeholder:text-sm outline-none focus:ring-2 focus:ring-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="captainPassword" className="block text-base sm:text-lg font-medium text-gray-700 mb-1">
              Enter password
            </label>
            <input 
              required
              type="password"
              id="captainPassword"
              placeholder="password"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 text-base sm:text-lg placeholder:text-sm outline-none focus:ring-2 focus:ring-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold rounded-lg py-2 hover:bg-green-800 transition-colors duration-200 text-lg"
          >
            Login
          </button>

          {
            error && (
              <p className="text-red-600 text-sm font-semibold text-center">
                {error}
              </p>
            )
          }

        </form>

        {/* Registration Link */}
        <p className="mt-6 text-sm sm:text-base font-medium">
          Become a Captain today ? {"  "}
          <Link to="/captain-register" className="text-green-700 font-semibold hover:underline">
            Create New Account
          </Link>
        </p>
      </div>

      {/* Switch to user login */}
      <div className="w-full max-w-md mt-10 mb-6">
        <Link to="/login">
          <button className="w-full border border-gray-700 text-gray-800 font-semibold rounded-lg py-2 text-lg hover:bg-gray-800 hover:text-white transition-colors duration-200">
            Login as User
          </button>
        </Link>
      </div>

    </div>
  );
}

export default CaptainLogin;
