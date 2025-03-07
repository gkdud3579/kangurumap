import styles from "../styles/Result.module.scss";

const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <div
      className={styles.restaurantCard}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      {/* 가게 이미지 */}
      <img
        src={restaurant.photo.pc.l}
        alt={restaurant.name}
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
        <p className={styles.restaurantAddress}>{restaurant.address}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
