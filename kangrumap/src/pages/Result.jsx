import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/SideBar";
import styles from "../styles/Result.module.scss";
import ItemBox from "../components/ItemBox";
import RestaurantCard from "../components/RestaurantCard";


const Result = () => {

  return (
    <div className={styles.result}>
      <Header />
      <div className={styles.resultMain}>
        <Sidebar />
        <div>
        <ItemBox />
        <RestaurantCard />
        </div>
        
      </div>
      <Footer />
    </div>
  );
};

export default Result;
