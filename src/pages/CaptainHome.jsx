import { useGSAP } from "@gsap/react";
import DriverDetails from "../components/DriverDetails";
import RideRequestPopup from "../components/RideRequestPopup";
import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import { sendLocationUpdate } from "../utils/location_update";
import { acceptRide as acceptRideApi } from "../apis/api";
import LiveTracking from "../components/LiveTracking";

function CaptainHome() {
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [ride, setRide] = useState(null);

  const newRequestPopUpPanel = useRef();
  const confirmRidePanelRef = useRef();

  const socket = useContext(SocketContext);

  const acceptRide = async () => {
    try {
      await acceptRideApi({
        rideId: ride._id,
        captainId: captain.id,
      });
      setConfirmRidePanel(true);
    } catch (error) {
      console.log(`Something went wrong while accpeting ride: ${error}`);
    }
  };

  // New ride popup
  useEffect(() => {
    if (!socket) return;

    const handleNewRide = (data) => {
      setRidePopUpPanel(true);
      setRide(data);
    };

    socket.on("new-ride", handleNewRide);

    return () => {
      socket.off("new-ride", handleNewRide);
    };
  }, [socket]);

  // Setting captain socket id
  useEffect(() => {
    if (socket && captain && captain.id)
      socket.emit("join", { userType: "captain", userId: captain.id });
  }, [socket, captain]);

  useEffect(() => {
    if (socket && captain && captain.id) {
      sendLocationUpdate({
        socket,
        userId: captain.id,
        eventName: "update-location-captain",
      });
      const interval = setInterval(() => {
        sendLocationUpdate({
          socket,
          userId: captain.id,
          eventName: "update-location-captain",
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [socket, captain]);

  useEffect(() => {
    if (!socket) return;

    const handleRideCancelled = (data) => {
      setRide(null);
      setRidePopUpPanel(false);
      setConfirmRidePanel(false);
    };

    socket.on("ride-request-cancelled", handleRideCancelled);

    return () => {
      socket.off("ride-request-cancelled", handleRideCancelled);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handleRideAlreadyAccepted = (data) => {
      console.log('ride already accepted', data);
      setRide(null);
      setRidePopUpPanel(false);
      setConfirmRidePanel(false);
    };

    socket.on("ride-request-already-accepted", handleRideAlreadyAccepted);

    return () => {
      socket.off("ride-request-already-accepted", handleRideAlreadyAccepted);
    };
  }, [socket]);

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(newRequestPopUpPanel.current, {
        duration: 0.5,
        ease: "power3.in",
        y: "0%",
      });
    } else {
      gsap.to(newRequestPopUpPanel.current, {
        duration: 0.5,
        ease: "power3.out",
        y: "100%",
      });
    }
  }, [ridePopUpPanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        duration: 0.5,
        ease: "power3.in",
        y: "0%",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        duration: 0.5,
        ease: "power3.out",
        y: "100%",
      });
    }
  }, [confirmRidePanel]);

  useEffect(() => {
    gsap.set(newRequestPopUpPanel.current, { y: "100%" });
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <TopBar role={"captain"} />

      {/* Map Section */}
      <LiveTracking />

      {/* Driver details */}
      <DriverDetails />

      {/* Ride Request Popups */}
      <RideRequestPopup
        ref={newRequestPopUpPanel}
        ride={ride}
        acceptRide={acceptRide}
        setRidePopUpPanel={setRidePopUpPanel}
        setConfirmRidePanel={setConfirmRidePanel}
      />

      {/* ConfirmRidePanel */}
      <ConfirmRidePanel
        ref={confirmRidePanelRef}
        ride={ride}
        setRide={setRide}
        setConfirmRidePanel={setConfirmRidePanel}
        setRidePopUpPanel={setRidePopUpPanel}
      />
    </div>
  );
}

export default CaptainHome;
