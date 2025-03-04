import styles from "../styles/Result.module.scss";

const RestaurantCard = () => {
  return (
    <div className={styles.restaurantCard}>
      {/* 가게 이미지 */}
      <img
        src="/logo.png"
        alt="restaurantName"
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
        <p className={styles.restaurantAddress}>
          東京都杉並区高円寺南４-45-7 壱番館ビル1F
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
