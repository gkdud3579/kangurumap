import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";

const Home = () => {
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
          <p className={styles.location}>📍 1-7 Hama, Awaji, Hyogo 656-2304</p>
          <button className={styles.searchButton}>検索</button>
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
