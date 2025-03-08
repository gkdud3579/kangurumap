import { useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Detail.module.scss";
import ItemBox from "../components/ItemBox";
import html2canvas from "html2canvas";

const Detail = () => {
  const location = useLocation();
  const restaurant = location.state?.restaurant; // 전달된 데이터 가져오기
  if (!restaurant) {
    return <p>レストランの詳細情報がありません。</p>; // 데이터가 없을 경우 예외 처리
  }
  const conditionMappings = {
    wifi: "WiFi",
    card: "カード払い",
    non_smoking: "禁煙席",
    english: "英語メニュー",
    barrier_free: "バリアフリー",
    parking: "駐車場あり",
    child: "お子様連れOK",
    private_room: "個室あり",
    free_drink: "飲み放題",
    free_food: "食べ放題",
    lunch: "ランチあり",
    midnight: "23時以降も営業",
    pet: "ペット可",
  };

  const captureRef = useRef(null);

  //스크린샷 캡쳐함수
  const handleScreenshot = async () => {
    console.log("📸 스크린샷 버튼 클릭됨");

    if (!captureRef.current) {
      console.error("❌ 캡처할 요소를 찾을 수 없음");
      return;
    }

    try {
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const image = canvas.toDataURL("image/png");

      // 🖼 자동 다운로드 기능 추가
      const link = document.createElement("a");
      link.href = image;
      link.download = "screenshot.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log("📸 캡처 및 다운로드 성공!");
    } catch (error) {
      console.error("📸 스크린샷 캡처 오류:", error);
    }
  };

  console.log("🔍 레스토랑 데이터:", restaurant);

  return (
    <div className={styles.detail} ref={captureRef}>
      <Header />
      <ItemBox setLatLng={() => {}} />
      <div className={styles.detailContent}>
        <div className={styles.thumbnailInfo}>
          <img
            src={restaurant.photo.pc.l}
            alt="restaurantImg"
            className={styles.restaurantImage}
          />
          {/* 가게 정보 */}
          <div className={styles.restaurantInfo}>
            <div className={styles.restaurantTitle}>
              <h2 className={styles.restaurantName}>{restaurant.name}</h2>
              <span className={styles.restaurantGenre}>
                {restaurant.genre.name}
              </span>
            </div>
            <p className={styles.restaurantCatch}>{restaurant.catch}</p>
            <p className={styles.restaurantSubway}>{restaurant.access}</p>
            <span
              className={`${styles.shareIcon} material-symbols-outlined`}
              onClick={handleScreenshot}
              style={{ cursor: "pointer" }}
            >
              share
            </span>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.detailInfo}>
          <h2>住所</h2>
          <p>{restaurant.address}</p>
          <h2>営業時間</h2>
          <p>{restaurant.open}</p>
          <h2>平均価格</h2>
          <p>{restaurant.budget.name}</p>
          <h2>条件</h2>
          {/* 조건 버튼 리스트 */}
          <div className={styles.conditionTags}>
            {Object.keys(conditionMappings)
              .filter(
                (key) =>
                  // eslint-disable-next-line no-prototype-builtins
                  restaurant.hasOwnProperty(key) &&
                  (restaurant[key] === "あり" ||
                    restaurant[key] === "利用可" ||
                    restaurant[key] === "全面禁煙" ||
                    restaurant[key] === "お子様連れ歓迎")
              )
              .map((key) => (
                <button key={key} className={styles.filterButton}>
                  {conditionMappings[key]}
                </button>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
