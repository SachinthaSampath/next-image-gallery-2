import styles from "./NotFound.module.css";
const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.number}>404</div>
      <div className={styles.text}>
        <span>Ooops...</span>
        <br />
        page not found
      </div>
    </div>
  );
};

export default NotFound;
