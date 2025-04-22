import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerCopyright}>© 2025 韓グルマップ. All rights reserved.</p>
      <a href="https://webservice.recruit.co.jp/"><img src="https://webservice.recruit.co.jp/banner/hotpepper-s.gif" alt="ホットペッパーグルメ Webサービス" width="135" height="17" border="0" title="ホットペッパーグルメ Webサービス"/></a>
    </footer>
  );
};

export default Footer;
