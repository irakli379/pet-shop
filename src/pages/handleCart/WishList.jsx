import { useEffect } from "react";
import PageNav from "../PageNav";
import { getAnimals } from "../handleAnimals/animals.thunks";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../UseLocalStorage";
import { useNavigate } from "react-router-dom";
import styles from "./WishList.module.css";

export default function WishList() {
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const [
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  ] = useLocalStorage("wishlist", []);

  const [cartList, addToCartList] = useLocalStorage("cartlist", []);

  const handleAddToWishlist = (animalName) => {
    addToWishlist(animalName);
  };

  const handleRemoveFromWishlist = (animalName) => {
    removeFromWishlist(animalName);
  };

  const availableAnimals = cartState.animals.filter(
    (animal) => !isInWishlist(animal.name)
  );

  const handleAddToCart = (animalName) => {
    addToCartList(animalName);
    removeFromWishlist(animalName);
    navigate("/cart");
  };

  function handleAddAllToCart() {
    const item = window.localStorage.getItem("wishlist");
    const wishlist = item ? JSON.parse(item) : [];
    if (wishlist.length === 0) return;
    const updatedCartList = [...cartList, ...wishlist];
    addToCartList(updatedCartList);
    clearWishlist("wishlist");
    navigate("/cart");
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnimals());
  }, [dispatch]);

  return (
    <>
      <PageNav />

      <div className={styles.container}>
        <div className={styles.availableAnimals}>
          <h1>Available Animals</h1>
          <ul className={styles.animalList}>
            {availableAnimals.map((animal) => (
              <li key={animal.id} className={styles.animalItem}>
                {animal.name}
                <button
                  className={styles.button}
                  onClick={(e) => handleAddToWishlist(animal.name)}
                >
                  Add to Wishlist
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.wishlist}>
          {wishlist?.length > 0 ? (
            <h1>Animals in the Wishlist</h1>
          ) : (
            <h1>Add animals to Wishlist</h1>
          )}
          <ul className={styles.animalList}>
            {wishlist.map((animal, index) => (
              <li key={index} className={styles.animalItem}>
                {animal}
                <div className={styles.actionButtons}>
                  <button
                    className={styles.button}
                    onClick={() => handleRemoveFromWishlist(animal)}
                  >
                    Remove From Wishlist
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleAddToCart(animal)}
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {wishlist?.length > 0 && (
            <button
              className={`${styles.button} ${styles.addAllButton}`}
              onClick={handleAddAllToCart}
            >
              Add all to Cart
            </button>
          )}
        </div>
      </div>
    </>
  );
}
