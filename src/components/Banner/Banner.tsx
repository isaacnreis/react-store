import styles from "./Banner.module.scss";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h1>Grandes Ofertas! 🔥</h1>
        <p>Os melhores produtos com descontos exclusivos. Aproveite!</p>
        <button>Ver Ofertas</button>
      </div>
    </section>
  );
};

export default Banner;
