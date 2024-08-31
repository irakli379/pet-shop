import PageNav from "./PageNav";
import styles from "./MainPage.module.css"

export default function MainPage() {
  return (
    <div >
      <PageNav />
      <div className={styles.div}>
        <h1 className={styles.h1}>Main Page || Pet Shop</h1>
      </div>
    </div>
  );
}
