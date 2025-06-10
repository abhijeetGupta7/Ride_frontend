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
    return null;
  }
};

export const acceptRide = async ({ rideId, captainId }) => {
  const token = localStorage.getItem('captainToken');
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