import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import MainLocationPanel from "../components/MainLocationPanel";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleSelectionPanel from "../components/VehicleSelectionPanel";
import WaitingForDriverPanel from "../components/WaitingForDriverPanel";
import DriverComingPanel from "../components/DriverComingPanel";
import { useNavigate } from "react-router-dom";
import { createRide, getAutoCompleteSuggestions, getTripFareDistanceDurationForAllVehicleTypes } from "../apis/map.api";
import { VEHICLE_TYPES } from "../constants/vehicleTypes";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";

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
  const [driverDetails, setDriverDetails] = useState(null);
  const [driverStatus, setDriverStatus] = useState("null"); // null | 'searching' | 'coming' | 'arrived' | riding

  const [locationSearchQuery, setLocationSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [vehicles, setVehicles]=useState([])

  const socket=useContext(SocketContext);
  const {user,setUser}=useContext(UserDataContext); 

  // Setting Socket id for user
  useEffect(()=> {
    if(socket) socket.emit('join', {userType:'user', userId:user.id});
  },[user])

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
      const vehicleData=await getTripFareDistanceDurationForAllVehicleTypes(pickup, destination);
      const mergedVehicleData = VEHICLE_TYPES.map( staticVehicle => {
        const key=staticVehicle.type;
        const dynamic = vehicleData && vehicleData[key];
        return {
          ...staticVehicle,
          fare: dynamic ? dynamic.fare : null,
          distance: dynamic ? dynamic.raw.distance.text : null,
          duration: dynamic ? dynamic.raw.duration.text : null,
          available: !!dynamic,
        }
      })
      setVehicles(mergedVehicleData)
    }
  };
  
  const handleVehicleSelect = (vehicle) => {
    if (vehicle.available) setSelectedVehicle(vehicle);
  };

  const confirmRide = async() => {
    await createRide(pickup, destination, selectedVehicle.type);
    setShowVehiclePanel(false);
    setWaitingForDriver(true); // set Searching for driver(true)
    setDriverStatus("searching");

    // Mock driver search (replace with actual API call)
    setTimeout(() => {
      setDriverFound(true);
      setDriverDetails({
        name: "Rajesh Kumar",
        rating: 4.8,
        vehicle: selectedVehicle.type,
        eta: "3 min",
        distance: "0.8 km",
        plateNumber: "DL5SAB1234",
      });
    }, 3000);
  };

  const cancelSearch = () => {
    setWaitingForDriver(false);
    setDriverFound(false);
    setDriverStatus(null);
  };

  // -------------------- Animation Logic --------------------
  // Location panel animation
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

  // Vehicle panel animation
  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      y: showVehiclePanel ? 0 : "100%",
      duration: 0.5,
      ease: showVehiclePanel ? "power3.out" : "power3.in",
    });
  }, [showVehiclePanel]);

  // Waiting panel animation
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
      <TopBar />

      {/* Map Placeholder */}
      <div className="absolute inset-0 flex justify-center items-center bg-gray-300">
        <p>Map will appear here</p>
      </div>

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
      {/* Waiting/Driver Found Panel */}
      {driverStatus === "searching" && (
        <WaitingForDriverPanel
          waitingPanelRef={waitingPanelRef}
          driverFound={driverFound}
          setDriverFound={setDriverFound}
          pickup={pickup}
          destination={destination}
          selectedVehicle={selectedVehicle}
          driverDetails={driverDetails}
          cancelSearch={cancelSearch}
          setDriverStatus={setDriverStatus}
        />
      )}

      {driverStatus === "coming" && (
        <DriverComingPanel
          driverDetails={driverDetails}
          onCancel={cancelSearch}
          setDriverStatus={setDriverStatus}
        />
      )}

      {driverStatus === "arrived" && (
        <div className="fixed bottom-0 p-4 left-0 right-0 bg-white rounded-t-3xl shadow-xl z-70">
          <h2 className="text-xl font-bold mb-4">Your driver has arrived!</h2>
          <div className="mb-4 text-lg">
            <p className="font-bold">{driverDetails.name}</p>
            <p className="text-gray-600">
              {driverDetails.vehicle} • {driverDetails.plateNumber}
            </p>
            <p className="text-gray-600">Rating: {driverDetails.rating}</p>
          </div>

          <div className="font-bold p-5 text-lg">
            <h2>
              {" "}
              <span className="text-blue-600"> Pickup </span> : {pickup}
            </h2>
            <h2>
              {" "}
              <span className="text-green-900"> Destination: </span>{" "}
              {destination}
            </h2>
          </div>

          <button
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold"
            onClick={() => {
              setDriverStatus("riding");
              navigate("/riding");
            }}
          >
            Start Ride
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
