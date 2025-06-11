import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import MainLocationPanel from "../components/MainLocationPanel";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleSelectionPanel from "../components/VehicleSelectionPanel";
import DriverComingPanel from "../components/DriverComingPanel";
import { useNavigate } from "react-router-dom";
import {
  createRide,
  getAutoCompleteSuggestions,
  getTripFareDistanceDurationForAllVehicleTypes,
} from "../apis/map.api";
import { VEHICLE_TYPES } from "../constants/vehicleTypes";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import SearchingForDriverPanel from "../components/SearchingForDriverPanel";
import LiveTracking from "../components/LiveTracking";

const UserDashboard = () => {
  const navigate = useNavigate();

  // -------------------- State Management --------------------
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [showVehiclePanel, setShowVehiclePanel] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [driverFound, setDriverFound] = useState(false);
  const [rideDetails, setRideDetails] = useState(null); 
  const [driverStatus, setDriverStatus] = useState("null"); // null | 'searching' | 'coming' | riding

  const [locationSearchQuery, setLocationSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const socket = useContext(SocketContext);
  const { user, setUser } = useContext(UserDataContext);

  // Setting Socket id for user
  useEffect(() => {
    if (socket) socket.emit("join", { userType: "user", userId: user.id });
  }, [socket, user]);

  useEffect(() => {
    const handler = setTimeout(() => {
      async function getSuggestions() {
        if (!locationSearchQuery.trim()) {
          setSuggestions([]);
          return;
        }
        const places = await getAutoCompleteSuggestions(locationSearchQuery);
        setSuggestions(places);
      }

      getSuggestions();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [locationSearchQuery]);

  // -------------------- Refs for Animation --------------------
  const panelRef = useRef();
  const panelCloseRef = useRef();
  const vehiclePanelRef = useRef();
  const waitingPanelRef = useRef();

  // -------------------- Event Handlers --------------------
  const handleLocationSelect = (location) => {
    activeField === "pickup" ? setPickup(location) : setDestination(location);
    setPanelOpen(false);
  };

  const handleFindTrip = async () => {
    if (pickup && destination) {
      setShowVehiclePanel(true);
      const vehicleData = await getTripFareDistanceDurationForAllVehicleTypes(
        pickup,
        destination
      );
      const mergedVehicleData = VEHICLE_TYPES.map((staticVehicle) => {
        const key = staticVehicle.type;
        const dynamic = vehicleData && vehicleData[key];
        return {
          ...staticVehicle,
          fare: dynamic ? dynamic.fare : null,
          distance: dynamic ? dynamic.raw.distance.text : null,
          duration: dynamic ? dynamic.raw.duration.text : null,
          available: !!dynamic,
        };
      });
      setVehicles(mergedVehicleData);
    }
  };

  const handleVehicleSelect = (vehicle) => {
    if (vehicle.available) setSelectedVehicle(vehicle);
  };

  const confirmRide = async () => {
    await createRide(pickup, destination, selectedVehicle.type);
    setShowVehiclePanel(false);
    setWaitingForDriver(true); // set Searching for driver(true)
    setDriverStatus("searching");
  };

  useEffect(() => {
    if (!socket) return;

    const handleDriverFound = (data) => {
      // data is the full ride object from backend
      console.log("driver is found");
      setDriverFound(true);
      setRideDetails(data);
      console.log(data);
      setDriverStatus("coming");
    };

    socket.on("driver-found", handleDriverFound);

    return () => {
      socket.off("driver-found", handleDriverFound);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handleRideStarted = (data) => {
      setRideDetails(data);
      setDriverStatus("riding");
      navigate("/riding", {
        state: {
          rideDetails: data
        }
      });
    };

    socket.on("ride-started", handleRideStarted);

    return () => {
      socket.off("ride-started", handleRideStarted); 
    };
  }, [socket, navigate]);

  const cancelSearch = () => {
    setWaitingForDriver(false);
    setDriverFound(false);
    setDriverStatus(null);
    setRideDetails(null);
  };

  // -------------------- Animation Logic --------------------
  useGSAP(() => {
    gsap.to(panelRef.current, {
      y: panelOpen ? 0 : "100%",
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(panelCloseRef.current, {
      opacity: panelOpen ? 1 : 0,
      duration: 0.3,
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      y: showVehiclePanel ? 0 : "100%",
      duration: 0.5,
      ease: showVehiclePanel ? "power3.out" : "power3.in",
    });
  }, [showVehiclePanel]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.from(waitingPanelRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [waitingForDriver]);

  // -------------------- Render --------------------
  return (
    <div className="relative h-screen overflow-hidden bg-gray-100">
      {/* Top Navigation */}
      <TopBar role={'user'} />

      {/* Map Placeholder */}
        <LiveTracking />
    

      {/* Main Location Input Panel */}
      <MainLocationPanel
        pickup={pickup}
        destination={destination}
        onPickupClick={() => {
          setActiveField("pickup");
          setPanelOpen(true);
        }}
        onDestinationClick={() => {
          setActiveField("destination");
          setPanelOpen(true);
        }}
        onFindTrip={handleFindTrip}
      />

      {/* Location Search Panel */}
      <LocationSearchPanel
        ref={panelRef}
        activeField={activeField}
        suggestions={suggestions}
        handleLocationSelect={handleLocationSelect}
        panelCloseRef={panelCloseRef}
        onClose={() => setPanelOpen(false)}
        locationSearchQuery={locationSearchQuery}
        setLocationSearchQuery={setLocationSearchQuery}
      />

      {/* Vehicle Selection Panel */}
      <VehicleSelectionPanel
        vehicles={vehicles}
        selectedVehicle={selectedVehicle}
        onVehicleSelect={handleVehicleSelect}
        onClose={() => setShowVehiclePanel(false)}
        vehiclePanelRef={vehiclePanelRef}
        onConfirm={confirmRide}
      />

      {/* Searching for driver */}
      {driverStatus === "searching" && (
        <SearchingForDriverPanel
          waitingPanelRef={waitingPanelRef}
          pickup={pickup}
          destination={destination}
          selectedVehicle={selectedVehicle}
          cancelSearch={cancelSearch}
        />
      )}

      {/* Driver Coming Panel */}
      {driverStatus === "coming" && rideDetails && (
        <DriverComingPanel
          rideDetails={rideDetails}
          onCancel={cancelSearch}
          setDriverStatus={setDriverStatus}
        />
      )}
    </div>
  );
};

export default UserDashboard;
