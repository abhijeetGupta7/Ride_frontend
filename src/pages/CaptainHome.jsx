import { useGSAP } from "@gsap/react";
import DriverDetails from "../components/DriverDetails";
import RideRequestPopup from "../components/RideRequestPopup";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import ConfirmRidePanel from "../components/ConfirmRidePanel";

function CaptainHome() {
    
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    
    const newRequestPopUpPanel = useRef()
    const confirmRidePanelRef=useRef();

    useGSAP(() => {
        if(ridePopUpPanel) {
            gsap.to(newRequestPopUpPanel.current, {
                duration:0.5,
                ease: 'power3.in',
                y:'0%'
            })            
        } else {
            gsap.to(newRequestPopUpPanel.current, {
                duration:0.5,
                ease: 'power3.out',
                y:'100%'
            })  
        }
    }, [ridePopUpPanel])

    useGSAP( ()=> {
        if(confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                duration:0.5,
                ease:'power3.in',
                y:'0%'
            })
        }
        else {
            gsap.to(confirmRidePanelRef.current, {
                duration:0.5,
                ease:'power3.out',
                y:'100%'
            })
        }
    }, [confirmRidePanel])

    useEffect(() => {
        gsap.set(newRequestPopUpPanel.current, { y: '100%' });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRidePopUpPanel(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

  return (

    <div className="h-screen flex flex-col bg-gray-100">
     
      <TopBar/>

      {/* Map Section */}
      <div className="h-2/3 bg-gray-400 flex items-center justify-center text-white text-2xl font-bold">
        Map
      </div>

      {/* Driver details */}
      <DriverDetails />

      {/* Ride Request Popups */}
      <RideRequestPopup 
        ref={newRequestPopUpPanel}
        setRidePopUpPanel={setRidePopUpPanel}
        setConfirmRidePanel={setConfirmRidePanel}
      />

        {/* ConfirmRidePanel */}
        <ConfirmRidePanel
            ref={confirmRidePanelRef}
            setRidePopUpPanel={setRidePopUpPanel}
            setConfirmRidePanel={setConfirmRidePanel}
        />
        

    </div>
  );
}

export default CaptainHome;