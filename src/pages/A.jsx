import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FaMapMarkerAlt, FaTimes, FaSearch } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";


const A = () => {
  const [pickup, setPickup] = useState();
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const panelRef = useRef();
  const panelCloseRef = useRef();

  // Animation for panel open/close
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out"
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.2
      });
    } else {
      gsap.to(panelRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in"
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.2
      });
    }
  }, [panelOpen]);

  const handleLocationSelect = (location) => {
    if (activeField === 'pickup') {
      setPickup(location);
    } else {
      setDestination(location);
    }
    setPanelOpen(false);
  };

  const suggestions = [
    'Jalan Kishaya Siyah',
    'Kampung Bali',
    'Thamel, Kathmandu',
    'Patan Durbar Square'
  ];

  return (
    <div className="relative h-screen overflow-hidden bg-gray-100">
      {/* Map Area */}
      <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
        <p className="text-gray-500">Map will appear here</p>
      </div>

      {/* Top Bar */}
    <div className="absolute top-5 left-0 w-full px-5 z-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black-600">Ridee</h1>
        <CgProfile className="text-3xl text-gray-700 cursor-pointer" />
    </div>

      {/* Main Control Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl p-6 z-20">
        <h2 className="text-xl font-bold mb-4">Where to?</h2>
        
        {/* Location Inputs */}
        <div className="space-y-3 mb-6">
          <div 
            className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer"
            onClick={() => {
              setActiveField('pickup');
              setPanelOpen(true);
            }}
          >
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <FaMapMarkerAlt className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pickup</p>
              <p className="font-medium">{pickup || 'Select Pickup location'}</p>
            </div>
          </div>

          <div 
            className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer"
            onClick={() => {
              setActiveField('destination');
              setPanelOpen(true);
            }}
          >
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <FaMapMarkerAlt className="text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Destination</p>
              <p className="font-medium">{destination || 'Select destination'}</p>
            </div>
          </div>
        </div>

        <button 
          className="w-full bg-black text-white py-3 rounded-xl font-bold disabled:opacity-50"
          disabled={!pickup || !destination}
        >
          Find Trip
        </button>
      </div>

      {/* Location Search Panel */}
      <div 
        ref={panelRef}
        className="fixed inset-0 bg-white z-30 p-6 transform translate-y-full"
      >
        {/* Close Button */}
        <button 
          ref={panelCloseRef}
          className="absolute top-6 right-6 text-gray-500 opacity-0"
          onClick={() => setPanelOpen(false)}
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-xl font-bold mb-6">
          {activeField === 'pickup' ? 'Set pickup location' : 'Set destination'}
        </h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={activeField === 'pickup' ? 'Search pickup point' : 'Where to?'}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>

        {/* Suggestions List */}
        <div className="space-y-3">
          {suggestions.map((place) => (
            <div
              key={place}
              className="p-3 flex items-center hover:bg-gray-50 rounded-lg cursor-pointer"
              onClick={() => handleLocationSelect(place)}
            >
              <FaMapMarkerAlt className="mr-3 text-gray-400" />
              <span className="font-medium">{place}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default A;