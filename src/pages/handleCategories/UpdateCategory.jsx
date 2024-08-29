import PageNav from "../PageNav";
import styles from "./Categories.module.css"

export default function UpdateCategory() {
  return (
    <div>
      <PageNav />
      <div className={styles.header}>
        <h1>Update Category</h1>
      </div>
    </div>
  );
}
