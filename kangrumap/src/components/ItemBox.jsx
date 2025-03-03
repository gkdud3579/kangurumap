import styles from "../styles/Result.module.scss";
import { useState, useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation";
import useReverseGeocoding from "../hooks/useReverseGeocoding";

const ItemBox = () => {
  const { location, error: locationError } = useGeolocation(); // 위도/경도 가져오기
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

  return (
    <div className={styles.itemBox}>
      <div className={styles.locationLine}>
        {/* 위치 정보를 가져왔을 때만 표시 */}
        {currentLocation ? (
          <p className={styles.location}>📍 {currentLocation}</p>
        ) : addressError || locationError ? (
          /* 오류가 발생했을 때만 표시 */
          <p className={styles.error}>
            エラー: {addressError || locationError}
          </p>
        ) : (
          /* 위치 정보가 없을 때 로딩 상태 표시 */
          <p className={styles.location}>位置情報を取得中...</p>
        )}
      </div>
      <div className={styles.selectedButtons}>
        <button>中華</button>
      </div>
    </div>
  );
};

export default ItemBox;
