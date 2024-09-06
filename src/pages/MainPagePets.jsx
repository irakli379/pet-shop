import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import PageNav from "./PageNav";
import { loginToggle } from "./handleCart/cartSlice";
import styles from "./MainPage.module.css";

export default function MainPagePets() {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <PageNav />
      </div>
      <header className={styles.header}>
        <h1>Welcome to Pet Shop</h1>
        <button
          className={styles.button}
          onClick={() => dispatch(loginToggle())}
        >
          {cartState.isLoggedIn ? "Log out" : "Log in"}
        </button>
      </header>
      <Footer className={styles.footer} />
    </div>
  );
}
