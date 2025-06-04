import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import React from "react";

// Panel for searching and selecting a location (pickup or destination)
const LocationSearchPanel = React.forwardRef(
  (
    {
      activeField,
      suggestions,
      handleLocationSelect,
      panelCloseRef,
      onClose,
      locationSearchQuery,
      setLocationSearchQuery
    },
    panelRef
  ) => (
    <div
      ref={panelRef}
      className="fixed inset-0 bg-white z-30 flex flex-col p-6 transform translate-y-full"
    >
      {/* Header with title and close button */}
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">
          {activeField === "pickup" ? "Set pickup location" : "Set destination"}
        </h2>
        <button
          ref={panelCloseRef}
          className="text-4xl text-gray-600 mb-6 opacity-0"
          onClick={onClose}
          aria-label="Close"
        >
          <IoMdCloseCircleOutline />
        </button>
      </div>

      {/* Search input with icon */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={
            activeField === "pickup"
              ? "Search pickup point"
              : "Where to"
          }
          className="w-full pl-12 pr-4 py-3 border-gray-300 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
          onChange={ (e) => setLocationSearchQuery(e.target.value) }
          value={locationSearchQuery}
        />
      </div>

      {/* Suggestions list */}
      <div className="space-y-3 mt-5">
        {suggestions.map((place) => (
          <div
            className="p-3 flex items-center hover:bg-gray-100 rounded-lg cursor-pointer"
            key={place}
            onClick={() => handleLocationSelect(place)}
          >
            <FaMapMarkerAlt className="mr-3 text-gray-400" />
            <span className="font-medium">{place}</span>
          </div>
        ))}
      </div>
    </div>
  )
);

export default LocationSearchPanel;