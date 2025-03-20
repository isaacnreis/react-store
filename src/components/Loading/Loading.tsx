import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Carregando...</p>
    </div>
  );
};

export default Loading;
