import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import TopBar from "../components/TopBar";
import MainLocationPanel from "../components/MainLocationPanel";
import LocationSearchPanel from "../components/LocationSearchPanel";


const UserDashBoard = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false)       // is panel open ?
  const [activeField, setActiveField] = useState(null)   // pickup or destination
  const panelRef=useRef();
  const panelCloseRef=useRef();

  const suggestions = [
    "Jalan Kishaya Siyah",
    "Kampung Bali",
    "Thamel, Kathmandu",
    "Patan Durbar Square",
  ];

  const handleLocationSelect=(location) => {
    if(activeField==='pickup') {
      setPickup(location);
    } else {
      setDestination(location);
    }
    setPanelOpen(false)
  }

  useGSAP(() => {
    if(panelOpen) {
      gsap.to(panelRef.current, {
        y:0,
        duration: 0.5,
        ease:'power3.out'
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration:0.3
      })
    } else {
      gsap.to(panelRef.current, {
        y:'100%',
        duration:0.5,
        ease:'power3.out'
      })
      gsap.to(panelCloseRef.current, {
        opacity:0,
        duration:0.3
      });
    }
  }, [panelOpen]);

  return (
    <div className="relative h-screen overflow-hidden bg-gray-100">

      {/* Top Bar */}
     <TopBar />

      {/* Map Area */}
      <div className="absolute inset-0 flex justify-center items-center bg-gray-300">
        <p>Map will appear here</p>
      </div>

      {/* Main Location Panel */}
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
        onFindTrip={() => {
          // Add your Find Trip logic here if needed
        }}
      />
      
      {/* Location Search Panel */}       
      <LocationSearchPanel
        ref={panelRef}
        activeField={activeField}
        suggestions={suggestions}
        handleLocationSelect={handleLocationSelect}
        panelCloseRef={panelCloseRef}
        onClose={() => setPanelOpen(false)}
      />
    </div>
  )
}

export default UserDashBoard;