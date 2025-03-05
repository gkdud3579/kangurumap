import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/SideBar";
import styles from "../styles/Result.module.scss";
import ItemBox from "../components/ItemBox";
import RestaurantCard from "../components/RestaurantCard";
import useRestaurants from "../hooks/useRestaurants";

const Result = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedGenre = queryParams.get("genre");
  const selectedOptions = queryParams.get("options")?.split(",") || [];
  const selectedDistance = queryParams.get("distance");

  const [latLng, setLatLng] = useState(null);
  const { restaurants, error: restaurantError } = useRestaurants(
    latLng?.lat,
    latLng?.lng,
    selectedGenre, // 선택된 장르 추가
    selectedDistance, // 선택된 거리 추가
    selectedOptions // 선택된 옵션 추가
  );

  // 📌 디버깅을 위한 콘솔 로그 추가
  useEffect(() => {
    console.log("📍 현재 위도/경도:", latLng);
    console.log("🍽️ API에서 받아온 음식점 리스트 (필터 전):", restaurants);
    console.log("🎯 선택된 장르:", selectedGenre);
    console.log("📏 선택된 거리:", selectedDistance);
    console.log("✅ 선택된 옵션:", selectedOptions);
  }, [latLng, restaurants, selectedGenre, selectedDistance, selectedOptions]);

  // 🍽️ 선택한 조건으로 음식점 필터링
  const filteredRestaurants = restaurants
    ? restaurants.filter((restaurant) => {
        // 1️⃣ 장르 필터링: 선택된 장르가 있을 때만 적용
        const genreMatch = selectedGenre
          ? restaurant.genre && restaurant.genre.code === selectedGenre
          : true;

        // 2️⃣ 옵션 필터링: 선택된 옵션이 있을 때만 적용
        const optionsMatch = selectedOptions.length
          ? restaurant.features &&
            selectedOptions.every((option) =>
              restaurant.features.includes(option)
            )
          : true;

        return genreMatch && optionsMatch; // 🔹 거리 필터링 제거
      })
    : [];

  // 🎯 필터링 후 남은 음식점 리스트 확인
  useEffect(() => {
    console.log("🔍 필터링 후 음식점 리스트:", filteredRestaurants);
  }, [filteredRestaurants]);

  return (
    <div className={styles.result}>
      <Header />
      <div className={styles.resultMain}>
        <Sidebar />
        <div className={styles.resultCard}>
          <ItemBox
            setLatLng={setLatLng}
            latLng={latLng}
            selectedGenre={selectedGenre}
            selectedDistance={selectedDistance}
            selectedOptions={selectedOptions}
          />

          {/*  에러 메시지 출력 */}
          {restaurantError && (
            <p className={styles.error}>エラー: {restaurantError}</p>
          )}

          {/* 필터링된 음식점 출력 */}
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p className={styles.noResults}>
              ご希望のお店がありませんでした。
              <br />
              条件を変えて再検索してください。
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Result;
