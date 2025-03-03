import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";
import { useState, useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation";
import useReverseGeocoding from "../hooks/useReverseGeocoding";

const Home = () => {
  const { location, error: locationError } = useGeolocation(); // 위도/경도 가져오기
  const { address, error: addressError } = useReverseGeocoding(
    location?.lat,
    location?.lng
  ); // 위도/경도를 주소로 변환
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (address) {
      setCurrentLocation(address);
    }
  }, [address]);

  return (
    <div className={styles.home}>
      <Header />
      <main className={styles.mainContent}>
        <div className={styles.logoImageSection}>
          <img src="/logo.png" alt="Logo" className={styles.logo} />
        </div>
        <p className={styles.logoTitle}>韓グルマップ</p>
        <p className={styles.description}>
          韓グルマップは<br></br>現在地に基づき周辺のグルメを<br></br>
          教えてくれるサービスです
        </p>
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

        <div className={styles.byCategory}>
          <h1 className={styles.titleCategory}>メニューで検索</h1>
          <div className={styles.buttonsCategory}>
            <button className={styles.buttonCategory}>居酒屋</button>
          </div>
        </div>

        <div className={styles.byOption}>
          <p>条件で検索</p>
          <div className={styles.optionLabels}>
            <label>
              <input type="checkbox" /> 英語メニュー
            </label>
            <label>
              <input type="checkbox" /> WiFi
            </label>
            <label>
              <input type="checkbox" /> カード払い
            </label>
            <label>
              <input type="checkbox" /> 禁煙席
            </label>
          </div>
        </div>

        <div className={styles.byDistance}>
          <p>距離順で検索</p>
          <div className={styles.buttonsDistance}>
            <button>300m</button>
            <button>500m</button>
            <button>1000m</button>
            <button>2000m</button>
            <button>3000m</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
