import { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 64px)",
};

// Fallback position constants
const ControlPosition = {
  RIGHT_CENTER: window.google?.maps?.ControlPosition?.RIGHT_CENTER ?? 4
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [error, setError] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const updatePosition = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    };

    const handleError = (err) => {
      console.error("Error watching position", err);
      setError("Unable to retrieve your location");
    };

    navigator.geolocation.getCurrentPosition(updatePosition, handleError);
    const watchId = navigator.geolocation.watchPosition(
      updatePosition,
      handleError,
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <LoadScript 
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      onLoad={() => setMapLoaded(true)}
    >
      {mapLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition || { lat: 0, lng: 0 }}
          zoom={15}
          options={{
            fullscreenControl: true,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControlOptions: {
              position: ControlPosition.RIGHT_CENTER,
            },
            zoomControlOptions: {
              position: ControlPosition.RIGHT_CENTER,
            },
          }}
        >
          {currentPosition && <Marker position={currentPosition} />}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default LiveTracking;