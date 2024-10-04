import React, { useState } from 'react';

const GeolocationComponent = () => {
  const [locationInfo, setLocationInfo] = useState('Lat long are:');

  const handleGetLocation = () => {
    setLocationInfo('Fetching location...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationInfo(`Lat: ${latitude}, Long: ${longitude}`);
        },
        (error) => {
          console.error("Geolocation error:", error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setLocationInfo('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              setLocationInfo('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              setLocationInfo('The request to get user location timed out.');
              break;
            case error.UNKNOWN_ERROR:
              setLocationInfo('An unknown error occurred.');
              break;
            default:
              setLocationInfo(`Error: ${error.message}`);
          }
        }
      );
    } else {
      setLocationInfo('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation}>Get Lat Long</button>
      <p>{locationInfo}</p>
    </div>
  );
};

export default GeolocationComponent;
