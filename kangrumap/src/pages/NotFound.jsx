import styles from '../styles/NotFound.module.scss';

const NotFound = () => {
    return (
      <div className={styles.notFound}>
        <h1>404</h1>
        <p className={styles.description}>PageNotFound</p>
        <p className={styles.emoji}>🤯</p>
      </div>
    );
  };
  
  export default NotFound;
  