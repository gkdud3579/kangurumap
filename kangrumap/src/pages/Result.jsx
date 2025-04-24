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

  // 🔹 検索条件の復元 & 新しい検索時に localStorage 更新
  useEffect(() => {
    console.log("🔄 検索条件の変更を検知:", location.search);

    const queryParams = new URLSearchParams(location.search);
    const savedSearchParams = localStorage.getItem("searchParams");

    if (location.state?.fromDetail && savedSearchParams) {
      console.log("🔄 Detail ページから戻りました。検索条件を復元します。");

      const searchState = JSON.parse(savedSearchParams);
      setSelectedGenres(searchState.selectedGenres || []);
      setSelectedOptions(searchState.selectedOptions || []);
      setSelectedDistance(searchState.selectedDistance || "");
      setCurrentPage(
        location.state.prevPage ? Number(location.state.prevPage) : 1
      );
    } else {
      console.log("📡 新しい検索を実行: ", queryParams.toString());

      setSelectedGenres(queryParams.get("genre")?.split(",") || []);
      setSelectedOptions(queryParams.get("options")?.split(",") || []);
      setSelectedDistance(queryParams.get("distance") || "");

      // 新しい検索条件を 'local Storage' に保存
      const searchParams = {
        selectedGenres: queryParams.get("genre")?.split(",") || [],
        selectedOptions: queryParams.get("options")?.split(",") || [],
        selectedDistance: queryParams.get("distance") || "",
      };
      localStorage.setItem("searchParams", JSON.stringify(searchParams));
      localStorage.setItem("currentPage", 1); // 新しい検索なので最初のページに初期化
      setCurrentPage(1);
    }
  }, [location.search, location.state?.fromDetail]);

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
