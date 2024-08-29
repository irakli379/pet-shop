import PageNav from "../PageNav";
import styles from "./Categories.module.css"

export default function CategoriesList() {
  return (
    <div>
      <PageNav />
      <div className={styles.header}>
        <h1>Categories List</h1>
      </div>
    </div>
  );
}
