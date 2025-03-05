import { useEffect, useState } from "react";
import useGenres from "../hooks/useGenres";
import styles from "../styles/Result.module.scss";
import useGeolocation from "../hooks/useGeolocation";
import useReverseGeocoding from "../hooks/useReverseGeocoding";

const ItemBox = ({
  setLatLng,
  latLng,
  selectedGenre = "",
  selectedDistance = "",
  selectedOptions = [],
}) => {
  const { location, error: locationError } = useGeolocation();
  const { address, error: addressError } = useReverseGeocoding(
    location?.lat,
    location?.lng
  );

  // 위도/경도를 주소로 변환
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (address) {
      setCurrentLocation(address);
    }
  }, [address]);

  // 현재 위치 정보가 변경될 때 `Result.jsx`로 전달
  useEffect(() => {
    if (
      location &&
      (!latLng || latLng.lat !== location.lat || latLng.lng !== location.lng)
    ) {
      console.log("📍 ItemBox에서 전송하는 위치:", location);
      setLatLng(location);
    }
  }, [location, latLng, setLatLng]);

  useEffect(() => {
    console.log("📍 ItemBox - 현재 위치:", currentLocation);
    console.log("🎯 선택된 장르:", selectedGenre);
    console.log("📏 선택된 거리:", selectedDistance);
    console.log("✅ 선택된 옵션:", selectedOptions);
  }, [currentLocation, selectedGenre, selectedDistance, selectedOptions]);

  const { genres } = useGenres(); // 장르 목록 가져오기

  const genreName =
    genres.find((g) => g.code === selectedGenre)?.name || "全てのグルメ";

  return (
    <div className={styles.itemBox}>
      <div className={styles.locationLine}>
        {/* 위치 정보 표시 */}
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

      {/* 선택된 조건 버튼 표시 */}
      <div className={styles.selectedButtons}>
        {/* 장르 버튼 */}
        {selectedGenre && selectedGenre !== "all" && (
          <button className={styles.filterButton}>
            {genreName || "全てのグルメ"}
          </button>
        )}

        {/* 거리 버튼 */}
        {selectedDistance && (
          <button className={styles.filterButton}>
            {selectedDistance}m 以内
          </button>
        )}

        {/* 옵션 버튼 */}
        {Array.isArray(selectedOptions) &&
          selectedOptions.length > 0 &&
          selectedOptions.map((option, index) => (
            <button key={index} className={styles.filterButton}>
              {option}
            </button>
          ))}
      </div>
    </div>
  );
};

export default ItemBox;
