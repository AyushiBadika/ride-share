import styles from "./HeroSection.module.css";
export default function HeroSection() {
  return (
    <div className={styles.heroImg}>
      <img src="./heroImage.png" alt="" />
    </div>
  );
}
