import { useState } from "react";
import styles from "../styles/Result.module.scss";
import useGenres from "../hooks/useGenres";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { genres, error: genreError } = useGenres();

  // 🔹 선택된 필터 상태 관리
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(null);

  // 🔹 장르 선택 (복수 선택 가능)
  const handleGenreClick = (genre) => {
    setSelectedGenres(
      (prevGenres) =>
        prevGenres.includes(genre.code)
          ? prevGenres.filter((g) => g !== genre.code) // 선택 해제
          : [...prevGenres, genre.code] // 선택 추가
    );
  };

  // 🔹 옵션 선택
  const optionMappings = {
    英語メニュー: "english",
    WiFi: "wifi",
    カード払い: "card",
    禁煙席: "non_smoking",
  };

  const handleOptionChange = (option) => {
    const apiField = optionMappings[option];
    if (!apiField) return;

    setSelectedOptions((prevOptions) =>
      prevOptions.includes(apiField)
        ? prevOptions.filter((o) => o !== apiField)
        : [...prevOptions, apiField]
    );
  };

  // 🔹 거리 선택
  const handleDistanceClick = (distance) => {
    setSelectedDistance(distance);
  };

  // 🔹 검색 버튼 클릭 시 필터링된 검색 결과 적용
  const handleSearch = () => {
    if (!selectedDistance) {
      Swal.fire({
        icon: "error",
        title: "あれ？",
        text: "検索を行うには距離を選択してください！",
      });
      return;
    }

    const queryParams = new URLSearchParams();
    if (selectedGenres.length > 0)
      queryParams.append("genre", selectedGenres.join(","));
    if (selectedOptions.length > 0)
      queryParams.append("options", selectedOptions.join(","));
    if (selectedDistance) queryParams.append("distance", selectedDistance);

    navigate(`/result?${queryParams.toString()}`);
  };

  return (
    <div className={styles.sideBar}>
      <div className={styles.byCategory}>
        <h1 className={styles.titleCategory}>料理・ジャンルで検索</h1>
        <p className={styles.descriptionCategory}>
          複数選択可能、未選択時に全体選択で適用されます。
        </p>
        <div className={styles.buttonsCategory}>
          {genreError ? (
            <p className={styles.error}>エラー: {genreError}</p>
          ) : genres.length > 0 ? (
            genres.map((genre) => (
              <button
                key={genre.code}
                className={`${styles.buttonCategory} ${
                  selectedGenres.includes(genre.code) ? styles.selected : ""
                }`}
                onClick={() => handleGenreClick(genre)}
              >
                {genre.name}
              </button>
            ))
          ) : (
            <p>ジャンルを読み込み中...</p>
          )}
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.byOption}>
        <p>条件で検索</p>
        <div className={styles.optionLabels}>
          {Object.keys(optionMappings).map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                checked={selectedOptions.includes(optionMappings[option])}
                onChange={() => handleOptionChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.byDistance}>
        <p>距離で検索</p>
        <div className={styles.buttonsDistance}>
          {[300, 500, 1000, 2000, 3000].map((distance) => (
            <button
              key={distance}
              className={`${styles.buttonDistance} ${
                selectedDistance === distance ? styles.selected : ""
              }`}
              onClick={() => handleDistanceClick(distance)}
            >
              {distance}m以内
            </button>
          ))}
        </div>
      </div>

      <button className={styles.searchButton} onClick={handleSearch}>
        検索
      </button>
    </div>
  );
};

export default Sidebar;
