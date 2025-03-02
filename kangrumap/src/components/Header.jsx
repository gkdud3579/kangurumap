import { Link } from "react-router-dom"; // 
import styles from "../styles/Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </Link>
    </header>
  );
};

export default Header;
