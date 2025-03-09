import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
import useGeolocation from "../hooks/useGeolocation";
import useReverseGeocoding from "../hooks/useReverseGeocoding";
import useGenres from "../hooks/useGenres";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Home = () => {
  const navigate = useNavigate();

  // 📍 現在地の取得
  const { location, error: locationError } = useGeolocation();
  const { address, error: addressError } = useReverseGeocoding(
    location?.lat,
    location?.lng
  );

  // 🔹 選択された検索条件（ジャンル・オプション・距離）
  const [selectedGenres, setSelectedGenres] = useState([]); // ジャンル（複数選択可能）
  const [selectedOptions, setSelectedOptions] = useState([]); // オプション（WiFi、カード決済など）
  const [selectedDistance, setSelectedDistance] = useState(null); // 検索距離

  // 🔹 現在の住所情報を保存する状態
  const [currentLocation, setCurrentLocation] = useState(null);

  // 🔹 ジャンル情報を取得
  const { genres, error: genreError } = useGenres();

  // 住所情報が取得されたら state を更新
  useEffect(() => {
    if (address) {
      setCurrentLocation(address);
    }
  }, [address]);

  // 🔹 オプションの API パラメータマッピング
  const optionMappings = {
    英語メニュー: "english",
    WiFi: "wifi",
    カード払い: "card",
    禁煙席: "non_smoking",
  };

  // 🔹 ジャンルボタンクリック時の処理（選択・解除）
  const handleGenreClick = (genre) => {
    setSelectedGenres(
      (prevGenres) =>
        prevGenres.includes(genre.code)
          ? prevGenres.filter((g) => g !== genre.code) // クリック時に削除
          : [...prevGenres, genre.code] // クリック時に追加
    );
  };

  // 🔹 オプションチェックボックスの処理
  const handleOptionChange = (option) => {
    const apiField = optionMappings[option]; // UI のオプション名を API のパラメータに変換
    if (!apiField) return;

    console.log(`🔹 オプション選択: ${option} (API フィールド: ${apiField})`);

    setSelectedOptions(
      (prevOptions) =>
        prevOptions.includes(apiField)
          ? prevOptions.filter((o) => o !== apiField) // 選択解除時に削除
          : [...prevOptions, apiField] // 選択時に追加
    );
  };

  // 🔹 距離ボタンクリック時の処理
  const handleDistanceClick = (distance) => {
    console.log("🔹 距離選択:", distance);
    setSelectedDistance(distance);
  };

  // 🔹 検索ボタンをクリック時に `Result.jsx` へ移動
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
      queryParams.append("genre", selectedGenres.join(",")); // 選択したジャンルをカンマ(,)区切りで保存
    if (selectedOptions.length > 0)
      queryParams.append("options", selectedOptions.join(","));
    if (selectedDistance) queryParams.append("distance", selectedDistance);

    navigate(`/result?${queryParams.toString()}`);
  };

  return (
    <div className={styles.home}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.backgroundContainer}>
          {/* 背景画像 */}
          <div className={styles.backgroundImage}></div>

          {/* メインコンテンツ */}
          <div className={styles.content}>
            <div className={styles.logoImageSection}>
              <img src="/logo.png" alt="Logo" className={styles.logo} />
            </div>
            <p className={styles.logoTitle}>韓グルマップ</p>
            <p className={styles.description}>
              韓グルマップは<br></br>現在地周辺のグルメを<br></br>
              教えてくれるサービスです
            </p>
          </div>
        </div>

        {/* 📍 現在地の表示 */}
        <div className={styles.locationLine}>
          {currentLocation ? (
            <p className={styles.location}>📍 {currentLocation}</p>
          ) : addressError || locationError ? (
            <p className={styles.error}>
              エラー: {addressError || locationError}
            </p>
          ) : (
            <p className={styles.location}>位置情報を取得中...</p>
          )}
          {/* 🔍 検索ボタン */}
          <button className={styles.searchButton} onClick={handleSearch}>
            検索
          </button>
        </div>

        {/* 🍽 料理・ジャンルの選択 */}
        <div className={styles.byCategory}>
          <h1 className={styles.titleCategory}>料理・ジャンルで検索</h1>
          <p className={styles.descriptionCategory}>
            ✏️ 複数選択可能、未選択時に全体選択で適用されます。
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

        {/* 🔹 条件（オプション）選択 */}
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

        {/* 🔍 距離選択 */}
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
      </main>
      <Footer />
    </div>
  );
};

export default Home;
