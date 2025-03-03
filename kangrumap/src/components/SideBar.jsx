import styles from "../styles/Result.module.scss";
import useGenres from "../hooks/useGenres";

const Sidebar = () => {
  const { genres, error: genreError } = useGenres();
  return (
    <div className={styles.sideBar}>
      <div className={styles.byCategory}>
        <h1 className={styles.titleCategory}>メニューで検索</h1>
        <div className={styles.buttonsCategory}>
          {/* 장르 버튼 동적으로 생성 */}
          {genreError ? (
            <p className={styles.error}>エラー: {genreError}</p>
          ) : genres.length > 0 ? (
            genres.map((genre) => (
              <button key={genre.code} className={styles.buttonCategory}>
                {genre.name}
              </button>
            ))
          ) : (
            <p>ジャンルを読み込み中...</p>
          )}
          <button className={styles.buttonCategory}>全てのグルメ</button>
        </div>
        <div className={styles.divider}></div>
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
        <div className={styles.divider}></div>
      </div>

      <div className={styles.byDistance}>
        <p>距離順で検索</p>
        <div className={styles.buttonsDistance}>
          <button>300m以内</button>
          <button>500m以内</button>
          <button>1000m以内</button>
          <button>2000m以内</button>
          <button>3000m以内</button>
        </div>
      </div>
      <button className={styles.searchButton}>検索</button>
    </div>
  );
};

export default Sidebar;
