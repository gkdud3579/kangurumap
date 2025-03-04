import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_HOTPEPPER_API_KEY;

const useRestaurants = (lat, lng) => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return; // 위도/경도 값이 없으면 실행 X

    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${API_KEY}&lat=${lat}&lng=${lng}&range=3&format=json`
        );
        const data = await response.json();

        if (data.results.shop) {
          setRestaurants(data.results.shop); // 레스토랑 목록 저장
        } else {
          throw new Error("식당 데이터를 불러올 수 없습니다.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRestaurants();
  }, [lat, lng]);

  return { restaurants, error };
};

export default useRestaurants;
