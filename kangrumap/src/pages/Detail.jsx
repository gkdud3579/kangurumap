import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Detail.module.scss";
import ItemBox from "../components/ItemBox";

const Detail = () => {
  return (
    <div className={styles.detail}>
      <Header />
      <ItemBox />
      <div className={styles.detailContent}>
        <div className={styles.thumbnailInfo}>
          <img
            src="/logo.png"
            alt="restaurantImg"
            className={styles.restaurantImage}
          />
          {/* 가게 정보 */}
          <div className={styles.restaurantInfo}>
            <div className={styles.restaurantTitle}>
              <h2 className={styles.restaurantName}>福来門</h2>
              <span className={styles.restaurantGenre}>中華</span>
            </div>
            <p className={styles.restaurantCatch}>
              地元の人に愛されてきたコスパ最強の中華
            </p>
            <p className={styles.restaurantSubway}>
              ＪＲ高円寺駅南口より徒歩約1分
            </p>
            <span className={`${styles.shareIcon} material-symbols-outlined`}>
              share
            </span>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.detailInfo}>
          <h2>住所</h2>
          <p>東京都杉並区高円寺南４-45-7 壱番館ビル1F</p>
          <h2>営業時間</h2>
          <p>
            月～日、祝日、祝前日: 11:30～翌4:30 (料理L.O. 翌3:00 ドリンクL.O.
            翌3:30)
          </p>
          <h2>平均価格</h2>
          <p>3001～4000円</p>
          <h2>条件</h2>
          <button className={styles.filterButton}>英語メニュー</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
