import { useState, useEffect } from "react";

const useReverseGeocoding = (lat, lng) => {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;

    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();

        if (data.display_name) {
          setAddress(data.display_name);
        } else {
          throw new Error("주소를 찾을 수 없습니다.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAddress();
  }, [lat, lng]);

  return { address, error };
};

export default useReverseGeocoding;
