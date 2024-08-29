import PageNav from "../PageNav";
import styles from "./AnimalInfo.module.css"

export default function AnimalInfo() {
  return (
    <div>
      <PageNav />
      <div className={styles.header}>
        Animal Info
      </div>
    </div>
  );
}
