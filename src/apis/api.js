import axios from "axios";

export const getAutoCompleteSuggestions = async (place) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/maps/auto-suggestions?input=${place}`
    );
    const data = response.data.data;
    return data.map((place) => place.prediction.description);
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getTripFareDistanceDurationForAllVehicleTypes = async (
  pickup,
  destination
) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/ride/estimate-fare-all?pickup=${pickup}&destination=${destination}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createRide = async (pickup, destination, vehicleType) => {
  try {
    const userToken = localStorage.getItem("userToken");
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/ride/create`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        withCredentials: true,
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const acceptRide = async ({ rideId, captainId }) => {
  const token = localStorage.getItem("captainToken");
  return axios.patch(
    `${import.meta.env.VITE_API_BASE_URL}/ride/accept`,
    { rideId, captainId },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
};

export const confirmRide = async ({ rideId, otp }) => {
  const token = localStorage.getItem("captainToken");
  return axios.patch(
    `${import.meta.env.VITE_API_BASE_URL}/ride/start`,
    { rideId, otp },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
};

export const finishRide = async ({ rideId }) => {
  const token = localStorage.getItem("captainToken");
  return axios.patch(
    `${import.meta.env.VITE_API_BASE_URL}/ride/complete`,
    { rideId },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
};

export const submitFeedback = async ({ rideId, feedback }) => {
  const token = localStorage.getItem("userToken");
  console.log(rideId, feedback);
  return axios.patch(
    `${import.meta.env.VITE_API_BASE_URL}/ride/feedback`,
    { rideId, feedback },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
};

export const cancelRideRequest = async (rideId) => {
  const token = localStorage.getItem("userToken");
  console.log('Ride req cancelled by user',rideId)
  return axios.patch(
    `${import.meta.env.VITE_API_BASE_URL}/ride/cancel`,
    { rideId },
    {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }
  );
};

