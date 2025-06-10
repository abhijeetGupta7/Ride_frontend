export function sendLocationUpdate({ socket, userId, eventName = "update-location-captain" }) {

    if (navigator.geolocation && socket && userId) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        socket.emit(eventName, {
          userId,
          location: {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          },
        });
      },
      (error) => {
        console.log("Error getting location:", error);
      },
      { enableHighAccuracy: true } 
    );
  }
}