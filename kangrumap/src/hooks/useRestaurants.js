/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_HOTPEPPER_API_KEY;

const useRestaurants = (lat, lng, genre, distance, options = [], page = 1) => {
  const [restaurants, setRestaurants] = useState([]);
  const [resultsAvailable, setResultsAvailable] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchRestaurants = async () => {
      try {
        const apiRange = distance ? Math.min(Math.ceil(distance / 500), 5) : 3;

        const featureParams =
          options && options.length > 0
            ? options.map((option) => `${option}=あり`).join("&")
            : "";

        const startIndex = (page - 1) * 10 + 1; // ✅ 페이지네이션을 반영한 start 값

        const url = `/api/hotpepper/gourmet/v1/?key=${API_KEY}&lat=${lat}&lng=${lng}&range=${apiRange}&genre=${
          genre || ""
        }&${featureParams}&format=json&start=${(page - 1) * 10 + 1}`;

        console.log("📡 요청 URL:", url);
        console.log(
          "🔎 선택된 장르:",
          genre,
          "거리:",
          distance,
          "옵션:",
          options,
          "페이지:",
          page,
          "Start Index:",
          startIndex
        );

        const response = await fetch(url, { signal });
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
      controller.abort();
    };
  }, [lat, lng, genre, distance, JSON.stringify(options), page]);

  return { restaurants, resultsAvailable, error };
};

export default useRestaurants;
