/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/SideBar";
import styles from "../styles/Result.module.scss";
import ItemBox from "../components/ItemBox";
import RestaurantCard from "../components/RestaurantCard";
import useRestaurants from "../hooks/useRestaurants";
import Pagination from "../components/Pagination";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // 🔹 URL クエリパラメータから検索条件を取得
  const selectedGenresFromQuery = queryParams.get("genre")?.split(",") || [];
  const selectedOptionsFromQuery = queryParams.get("options")?.split(",") || [];
  const selectedDistanceFromQuery = queryParams.get("distance");

  // 🔹 位置情報と現在のページを管理
  const [latLng, setLatLng] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState(selectedGenresFromQuery);
  const [selectedOptions, setSelectedOptions] = useState(
    selectedOptionsFromQuery
  );
  const [selectedDistance, setSelectedDistance] = useState(
    selectedDistanceFromQuery
  );

  // 🔹 API からレストランデータを取得
  const {
    restaurants,
    resultsAvailable,
    error: restaurantError,
  } = useRestaurants(
    latLng?.lat,
    latLng?.lng,
    selectedGenres,
    selectedDistance,
    selectedOptions,
    currentPage
  );

  // 🔹 総ページ数の計算（1ページあたり10件）
  const totalPages = Math.ceil(resultsAvailable / 10);

  // 🍽️ 選択した条件でレストランをフィルタリング
  const filteredRestaurants = restaurants
    ? restaurants.filter((restaurant) => {
        // 1️⃣ ジャンルフィルタリング（選択されている場合のみ適用）
        const genreMatch = selectedGenres.length
          ? selectedGenres.includes(restaurant.genre?.code)
          : true;

        // 2️⃣ オプションフィルタリング（API からのデータと比較）
        const optionsMatch = selectedOptions.length
          ? selectedOptions.every((option) => {
              const apiOption = restaurant[option]?.trim().toLowerCase(); // 空白を削除し、小文字変換
              return apiOption === "あり" || apiOption === "利用可"; // 正確な値を比較
            })
          : true;

        return genreMatch && optionsMatch;
      })
    : [];

  return (
    <div className={styles.result}>
      <Header />
      <div className={styles.resultMain}>
        <Sidebar />
        <div className={styles.resultCard}>
          {/* 🔹 現在の検索条件を表示 */}
          <ItemBox
            setLatLng={setLatLng}
            latLng={latLng}
            selectedGenres={selectedGenres}
            selectedDistance={selectedDistance}
            selectedOptions={selectedOptions}
          />
          <p className={styles.total}>検索結果 {resultsAvailable}件</p>

          {/* 🔴 エラーメッセージの表示 */}
          {restaurantError && (
            <p className={styles.error}>エラー: {restaurantError}</p>
          )}

          {/* 🔹 レストランリストの表示 */}
          {/* {filteredRestaurants.length > 0 ? ( */}
            {resultsAvailable > 0 ? (
            <>
              {/* {filteredRestaurants.map((restaurant) => ( */}
                {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() =>
                    navigate(`/detail/${restaurant.id}`, {
                      state: { restaurant },
                    })
                  }
                />
              ))}

              {/* 🔹 ページネーションの適用 */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
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
