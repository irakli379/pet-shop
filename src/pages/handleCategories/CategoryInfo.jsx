import PageNav from "../PageNav";
import styles from "./Categories.module.css"

export default function CategoryInfo() {
  return (
    <div>
      <PageNav />
      <div className={styles.header}>
        <h1>Category Info</h1>
      </div>
      
    </div>
  );
}
