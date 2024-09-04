import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav() {
  const cartState = useSelector((state) => state.cart);
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link
            to="/"
            className={`${styles.navLink} ${
              location.pathname === "/" ? styles.activeLink : ""
            }`}
          >
            Main Page
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/animalsList"
            className={`${styles.navLink} ${
              location.pathname === "/animalsList" ? styles.activeLink : ""
            }`}
          >
            Animals List
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/CategoriesList"
            className={`${styles.navLink} ${
              location.pathname === "/CategoriesList" ? styles.activeLink : ""
            }`}
          >
            Categories List
          </Link>
        </li>
        {cartState.isLoggedIn && (
          <>
            <li className={styles.navItem}>
              <Link
                to="/wishList"
                className={`${styles.navLink} ${
                  location.pathname === "/wishList" ? styles.activeLink : ""
                }`}
              >
                Wishlist
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/cart"
                className={`${styles.navLink} ${
                  location.pathname === "/cart" ? styles.activeLink : ""
                }`}
              >
                Cart
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
