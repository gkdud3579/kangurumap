import { useEffect, useState } from "react";
import useGenres from "../hooks/useGenres";
import styles from "../styles/Result.module.scss";
import useGeolocation from "../hooks/useGeolocation";
import useReverseGeocoding from "../hooks/useReverseGeocoding";

/**
 * ItemBox コンポーネント
 * - 現在位置情報を取得し、検索条件(ジャンル・距離・オプション)を表示する
 *
 * @param {Function} setLatLng - 緯度/経度情報を親コンポーネントへ渡す関数
 * @param {Object} latLng - 現在の緯度/経度情報
 * @param {Array} selectedGenres - 選択されたジャンルのリスト
 * @param {String} selectedDistance - 選択された距離
 * @param {Array} selectedOptions - 選択されたオプションのリスト
 */
const ItemBox = ({
  setLatLng,
  latLng,
  selectedGenres = [],
  selectedDistance = "",
  selectedOptions = [],
}) => {
  // 📍 ユーザーの位置情報を取得するカスタムフック
  const { location, error: locationError } = useGeolocation();
  // 📍 緯度/経度を住所に変換するカスタムフック
  const { address, error: addressError } = useReverseGeocoding(
    location?.lat,
    location?.lng
  );

  // 🏠 現在の住所を管理する状態
  const [currentLocation, setCurrentLocation] = useState(null);

  // 🎯 住所が取得されたら状態を更新
  useEffect(() => {
    if (address) {
      setCurrentLocation(address);
    }
  }, [address]);

  // 📍 位置情報が変更された場合、親コンポーネント(Result.jsx)に伝達
  useEffect(() => {
    if (
      location &&
      (!latLng || latLng.lat !== location.lat || latLng.lng !== location.lng)
    ) {
      console.log("📍 ItemBoxで送信する位置:", location);
      setLatLng(location);
    }
  }, [location, latLng, setLatLng]);

  // 🍽️ ジャンルリストを取得
  const { genres } = useGenres();

  // 🏷️ オプション名のマッピングテーブル
  const optionMappings = {
    english: "英語メニュー",
    wifi: "WiFi",
    card: "カード払い",
    non_smoking: "禁煙席",
  };

  return (
    <div className={styles.itemBox}>
      <div className={styles.locationLine}>
        {/* 📍 位置情報の表示 */}
        {currentLocation ? (
          <p className={styles.location}>📍 {currentLocation}</p>
        ) : addressError || locationError ? (
          <p className={styles.error}>
            エラー: {addressError || locationError}
          </p>
        ) : (
          <p className={styles.location}>位置情報を取得中...</p>
        )}
      </div>

      {/* 🔍 選択された検索条件を表示 */}
      <div className={styles.selectedButtons}>
        {/* 🍽️ 選択されたジャンルボタン */}
        {selectedGenres.length > 0 ? (
          selectedGenres.map((genreCode) => {
            const genre = genres.find((g) => g.code === genreCode);
            return genre ? (
              <button key={genreCode} className={styles.filterButton}>
                {genre.name}
              </button>
            ) : null;
          })
        ) : (
          <button className={styles.filterButton}>全てのグルメ</button>
        )}

        {/* 📏 選択された距離ボタン */}
        {selectedDistance && (
          <button className={styles.filterButton}>
            {selectedDistance}m 以内
          </button>
        )}

        {/* ⚙️ 選択されたオプションボタン */}
        {Array.isArray(selectedOptions) &&
          selectedOptions.length > 0 &&
          selectedOptions.map((option, index) => (
            <button key={index} className={styles.filterButton}>
              {optionMappings[option] || option}{" "}
              {/* マッピングされた名前を表示 */}
            </button>
          ))}
      </div>
    </div>
  );
};

export default ItemBox;
