import PageNav from "../PageNav";
import styles from "./Categories.module.css"

export default function AddCategory() {
  return (
    <div>
      <PageNav />
      <div className={styles.header} >
        <h1>Add Category</h1>
      </div>
      
    </div>
  );
}
