// LiveTracking.jsx (Leaflet version)
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ZoomControl } from "react-leaflet";

const containerStyle = {
  width: "100%",
  height: "100%",
  position: "relative",
  top: 0,
  left: 0,
  zIndex: 0,
};

// Custom marker icon setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, [center, map]);

  return null;
}

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  if (!navigator.geolocation) {
    setError("Geolocation is not supported by your browser");
    setIsLoading(false);
    return;
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
      setError(null);
      setIsLoading(false);
    },
    (err) => {
      console.error("Location error:", err);
      setError("Unable to retrieve your location. Please allow location access.");
      setIsLoading(false);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );

  return () => navigator.geolocation.clearWatch(watchId);
}, []);


  if (isLoading) return <div className="loading-message">Loading your location...</div>;
  if (error) return <div className="error-message" style={{ color: 'red', padding: '1rem' }}>{error}</div>;

  return (
    <div style={containerStyle} aria-label="Live tracking map">
      <MapContainer
        center={currentPosition || [51.505, -0.09]} 
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currentPosition && (
          <Marker 
            position={currentPosition} 
            title="Your current location"
          />
        )}
        <ChangeView center={currentPosition} />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default LiveTracking;