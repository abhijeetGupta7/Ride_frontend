import axios, { HttpStatusCode } from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

function UserRegister() {
  // State to manage form inputs
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});  
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Context for global user state
  const { user, setUser } = useContext(UserDataContext);

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Prepare data to send to backend
    const submittedData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password
    };
    setUserData(submittedData); // Optional: storing locally if needed later

    try {
      // Send POST request to register user
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/register`, submittedData, { withCredentials:true });

      const data = response.data;
      console.log("Registration successful:", data);

      // On success (201 Created), update global user state and navigate
      if (response.status === HttpStatusCode.Created) {
        const userData = {
          email: data.data.user.email,
          fullname: data.data.user.fullname,
          id:data.data.user._id
        };
        setUser(userData); // Update context
        localStorage.setItem('userToken', data.data.token); // Store token
        navigate("/user/dashboard"); // Redirect to profile
      }

      // Reset form inputs
      setEmail('');
      setPassword('');
      setFirstname('');
      setLastname('');

    } catch (error) {
      // Log any registration errors
      console.error("Registration failed:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      if(error.status === HttpStatusCode.Conflict) {
        setError("Email already registered.");
      } else {
        setError(`Registration falied. Something went wrong`);
      }       
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-6 sm:p-8 bg-gray-50">

      {/* Header & intro */}
      <div className="flex flex-col items-center w-full max-w-md">
        <h1 className="text-5xl font-bold text-black pt-5 tracking-widest mb-1 flex items-center gap-2">
          Ridee <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">User</span>
        </h1>
        <p className="text-sm text-gray-500 font-medium mb-6 mt-1">Welcome to Ridee!</p>

        {/* Registration form */}
        <form onSubmit={submitHandler} className="w-full space-y-6">

          {/* Name inputs */}
          <h2 className="block text-sm sm:text-base font-medium text-gray-700 mb-1">What's your name?</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text"
              id="userFirstname"
              required
              placeholder="First name"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input 
              type="text"
              id="userLastname"
              required
              placeholder="Last name"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          {/* Email input */}
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">
              What's your email?
            </label>
            <input 
              required
              type="email"
              id="userEmail"
              placeholder="email@example.com"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Enter password
            </label>
            <input 
              required
              type="password"
              id="userPassword"
              placeholder="Minimum 6 characters"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold rounded-lg py-2 hover:bg-gray-800 transition-colors duration-200 text-lg"
          >
            Register
          </button>

          {/* Error message */}
          {
            error && <p className="text-red-600 text-sm font-semibold text-center">{error}</p>
          }

        </form>

        {/* Redirect to login */}
        <p className="mt-6 text-sm font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Captain login alternative */}
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

export default UserRegister;
