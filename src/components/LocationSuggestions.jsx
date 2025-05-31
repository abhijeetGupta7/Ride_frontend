export default function LocationSuggestions({suggestions}) {
  return (
    <>
      <div className="space-y-3 mt-5">
        {suggestions.map((place) => {
          return (
            <div
              className="p-3 flex items-center hover:bg-gray-100 rounded-lg cursor-pointer"
              key={place}
              onClick={() => handleLocationSelect(place)}
            >
              <FaMapMarkerAlt className="mr-3 text-gray-400" />
              <span className="font-medium"> {place} </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
