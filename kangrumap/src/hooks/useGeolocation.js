import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; 

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`,
          {
            method: "POST",
          }
        );
        const data = await response.json();
        if (data.location) {
          setLocation(data.location);
        } else {
          throw new Error("위치를 가져올 수 없습니다.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLocation();
  }, []);

  return { location, error };
};

export default useGeolocation;
