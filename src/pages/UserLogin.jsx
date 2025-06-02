import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios, { HttpStatusCode } from 'axios';

function UserLogin() {
  // Local state for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);

  // Access global user context
  const { user, setUser } = useContext(UserDataContext); 
  const navigate = useNavigate(); 

  // Handles form submission
  const submitHandler = async (e) => {
    e.preventDefault(); 

    const submittedData = {
      email,
      password
    };

    setUserData(submittedData); // Optional: store form data locally

    try {
      // Send login request to backend
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login`, submittedData, { withCredentials:true });
      const data = response.data;

      // Update user context and store token
      setUser({
        email: data.data.user.email,
        fullname: data.data.user.fullname
      });
      localStorage.setItem('userToken', data.data.token);

      // Navigate to profile on success
      navigate("/user/dashboard");

      // Clear input fields
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log("Login error", error);
      if(error.status === HttpStatusCode.Unauthorized) {
        setError("Invalid email or password.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-6 sm:p-8 bg-gray-50">

      {/* Page header */}
      <div className="flex flex-col items-center w-full max-w-md">
        <h1 className="text-5xl font-bold text-black pt-5 tracking-widest mb-1 flex items-center gap-2">
          Ridee <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">User</span>
        </h1>
        <p className="text-sm text-gray-500 font-medium mb-6 mt-1">Welcome back, rider</p>

        {/* Login form */}
        <form onSubmit={submitHandler} className="w-full space-y-6">

          {/* Email field */}
          <div>
            <label htmlFor="userEmail" className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              What's your email?
            </label>
            <input 
              required
              type="email"
              id="userEmail"
              placeholder="email@example.com"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 text-base sm:text-lg placeholder:text-sm outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password field */}
          <div>
            <label htmlFor="userPassword" className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
              Enter password
            </label>
            <input 
              required
              type="password"
              id="userPassword"
              placeholder="password"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 text-base sm:text-lg placeholder:text-sm outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold rounded-lg py-2 hover:bg-gray-800 transition-colors duration-200 text-lg"
          >
            Login
          </button>

          {/* Error message */}
          {error && (
            <p className="text-red-600 text-sm font-semibold text-center">
              {error}
            </p>
          )}

        </form>

        {/* Link to registration */}
        <p className="mt-6 text-sm sm:text-base font-medium">
          Join a fleet?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Create New Account
          </Link>
        </p>
      </div>

      {/* Alternate captain login button */}
      <div className="w-full max-w-md mt-10 mb-6">
        <Link to="/captain-login">
          <button className="w-full bg-green-600 text-white font-semibold rounded-lg py-2 text-lg hover:bg-green-700 transition-colors duration-200">
            Login as Captain
          </button>
        </Link>
      </div>

    </div>
  );
}

export default UserLogin;
