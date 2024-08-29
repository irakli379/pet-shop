import { Link } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Link className={styles.link} to="/">Main Page</Link>
      <Link className={styles.link} to="/animalsList">Animals List</Link>
      <Link className={styles.link} to="/animalInfo">Animal Info</Link>
      <Link className={styles.link} to="/addAnimal">Add Animal</Link>
      <Link className={styles.link} to="/CategoriesList">Categories List</Link>
      <Link className={styles.link} to="/addCategory">Add Category</Link>
      <Link className={styles.link} to="/categoryInfo">Category Info</Link>
      <Link className={styles.link} to="/updateCategory">Update Category</Link>
    </nav>
  );
}
