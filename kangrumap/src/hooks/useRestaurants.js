/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_HOTPEPPER_API_KEY;

const useRestaurants = (lat, lng, genre, distance, options) => {
  const [restaurants, setRestaurants] = useState([]);
  const [resultsAvailable, setResultsAvailable] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;

    const controller = new AbortController(); // 요청 취소용 AbortController 생성
    const signal = controller.signal;

    const fetchRestaurants = async () => {
      try {
        const apiRange = distance ? Math.min(Math.ceil(distance / 500), 5) : 3;
        const featureParams =
          options.length > 0
            ? options
                .map((option) => `features=${encodeURIComponent(option)}`)
                .join("&")
            : "";

        const url = `/api/hotpepper/gourmet/v1/?key=${API_KEY}&lat=${lat}&lng=${lng}&range=${apiRange}&genre=${
          genre || ""
        }&${featureParams}&format=json`;

        console.log("📡 요청 URL:", url);
        console.log(
          "🔎 선택된 장르:",
          genre,
          "거리:",
          distance,
          "옵션:",
          options
        );

        const response = await fetch(url, { signal }); // AbortSignal 적용
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🔹 API 응답 데이터:", JSON.stringify(data, null, 2));

        if (data.results.shop.length > 0) {
          setRestaurants(data.results.shop);
          setResultsAvailable(data.results.results_available);
        } else {
          console.warn("🚨 검색 결과가 없습니다.");
          setRestaurants([]);
          setResultsAvailable(0);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("🚫 요청이 중단되었습니다.");
          return; // 요청이 취소된 경우 무시
        }
        console.error("🍽️ API 요청 오류:", error);
        setError(error.message);
      }
    };

    fetchRestaurants();

    return () => {
      controller.abort(); // 컴포넌트 언마운트 시 요청 중단
    };
  }, [lat, lng, genre, distance, JSON.stringify(options)]);

  return { restaurants, resultsAvailable, error };
};

export default useRestaurants;
