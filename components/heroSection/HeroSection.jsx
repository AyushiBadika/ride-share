import styles from "./HeroSection.module.css";
export default function HeroSection() {
  return (
    <div className={styles.heroImg}>
      <img className={styles.heroImg} src="./heroImage.png" alt="" />
    </div>
  );
}
