import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Result.module.scss";

const Result = () => {
  return (
    <div className={styles.result}>
      <Header />
      <h1>검색 결과 페이지</h1>
      <p>이 페이지에서 검색 결과를 표시합니다.</p>
      <Footer />
    </div>
  );
};

export default Result;
