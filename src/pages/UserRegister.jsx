import { useState } from "react";
import { Link } from "react-router-dom";

function UserRegister() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    const submittedData = {
      userEmail: email,
      userPassword: password,
      userFirstName: firstName,
      userLastName: lastName,
    };

    setUserData(submittedData);

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-6 sm:p-8 bg-gray-50">
      
      <div className="flex flex-col items-center w-full max-w-md">
        <h1 className="text-5xl font-bold text-black pt-5 tracking-widest mb-1 flex items-center gap-2">
          Ridee <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">User</span>
        </h1>
        <p className="text-sm text-gray-500 font-medium mb-6 mt-1">Welcome to Ridee!</p>

        <form onSubmit={submitHandler} className="w-full space-y-6">
          <h2 className="block text-sm sm:text-base font-medium text-gray-700 mb-1">What's your name?</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text"
              id="userFirstName"
              required
              placeholder="First name"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input 
              type="text"
              id="userLastName"
              required
              placeholder="Last name"
              className="w-full rounded-lg bg-gray-200 px-4 py-2 text-base placeholder:text-sm outline-none focus:ring-2 focus:ring-black"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

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

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold rounded-lg py-2 hover:bg-gray-800 transition-colors duration-200 text-lg"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-sm font-medium">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>

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
