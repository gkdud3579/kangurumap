import { useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Detail.module.scss";
import ItemBox from "../components/ItemBox";
import html2canvas from "html2canvas";

const Detail = () => {
  const location = useLocation();
  const restaurant = location.state?.restaurant; // レストラン情報を取得
  const captureRef = useRef(null); // スクリーンショットを取るための参照

  if (!restaurant) {
    return <p>レストランの詳細情報がありません。</p>; // レストラン情報がない場合の処理
  }

  // 🔹 レストランのオプションマッピング
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

  // 📸 スクリーンショットをキャプチャする関数
  const handleScreenshot = async () => {
    console.log("📸 スクリーンショットボタンがクリックされました。");

    if (!captureRef.current) {
      console.error("❌ キャプチャする要素が見つかりません。");
      return;
    }

    try {
      const canvas = await html2canvas(captureRef.current, {
        scale: 2, // 画像の解像度を2倍に設定
        useCORS: true, // クロスオリジン対応
        backgroundColor: null, // 背景を透明にする
      });

      const image = canvas.toDataURL("image/png"); // 画像をBase64に変換

      // 🖼 自動ダウンロード処理
      const link = document.createElement("a");
      link.href = image;
      link.download = "screenshot.png"; // ダウンロードファイル名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(
        "📸 スクリーンショットのキャプチャとダウンロードに成功しました！"
      );
    } catch (error) {
      console.error("📸 スクリーンショットキャプチャのエラー:", error);
    }
  };

  console.log("🔍 レストランデータ:", restaurant);

  return (
    <div className={styles.detail} ref={captureRef}>
      <Header />
      <ItemBox setLatLng={() => {}} />
      <div className={styles.detailContent}>
        <div className={styles.thumbnailInfo}>
          {/* レストランのメイン画像 */}
          <img
            src={restaurant.photo.pc.l}
            alt="restaurantImg"
            className={styles.restaurantImage}
          />
          {/* レストラン情報 */}
          <div className={styles.restaurantInfo}>
            <div className={styles.restaurantTitle}>
              <h2 className={styles.restaurantName}>{restaurant.name}</h2>
              <span className={styles.restaurantGenre}>
                {restaurant.genre.name}
              </span>
            </div>
            <p className={styles.restaurantCatch}>{restaurant.catch}</p>
            <p className={styles.restaurantSubway}>{restaurant.access}</p>
            {/* スクリーンショットボタン */}
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

        {/* 詳細情報 */}
        <div className={styles.detailInfo}>
          <h2>住所</h2>
          <p>{restaurant.address}</p>
          <h2>営業時間</h2>
          <p>{restaurant.open}</p>
          <h2>平均価格</h2>
          <p>{restaurant.budget.name}</p>
          <h2>条件</h2>
          {/* レストランの条件をボタンとして表示 */}
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
