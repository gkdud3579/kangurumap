import styles from "../styles/Result.module.scss";

/**
 * RestaurantCard コンポーネント
 * - レストランの情報をカード形式で表示
 * - クリックすると詳細ページへ遷移
 *
 * @param {Object} restaurant - レストランのデータ
 * @param {Function} onClick - クリック時のイベントハンドラー
 */
const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <div
      className={styles.restaurantCard}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* 🏪 レストランの画像 */}
      <img
        src={restaurant.photo.pc.l}
        alt={restaurant.name}
        className={styles.restaurantImage}
      />

      {/* ℹ️ レストラン情報 */}
      <div className={styles.restaurantInfo}>
        <div className={styles.restaurantTitle}>
          <h2 className={styles.restaurantName}>{restaurant.name}</h2>
          <span className={styles.restaurantGenre}>
            {restaurant.genre.name}
          </span>
        </div>
        <p className={styles.restaurantCatch}>{restaurant.catch}</p>
        <p className={styles.restaurantAddress}>{restaurant.address}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
