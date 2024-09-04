import { useDispatch, useSelector } from "react-redux";
import PageNav from "../PageNav";
import { getAnimals } from "../handleAnimals/animals.thunks";
import { useEffect } from "react";
import Spinner from "../Spinner";
import { addOneToCart, subtractOneFromCart } from "./cartSlice";
import useLocalStorage from "../UseLocalStorage";
import styles from "./Cart.module.css"; // Import the CSS module

export default function Cart() {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const item = window.localStorage.getItem("cartlist");
      const cartlist = item ? JSON.parse(item) : [];

      function addToCart(i) {
        if (Array.isArray(i) && i.length > 0) {
          i.forEach((e) => {
            const animal = cartState.animals.find((anp) => anp.name === e);
            if (animal) {
              dispatch(addOneToCart(animal));
            }
          });
        }
      }

      try {
        await dispatch(getAnimals());
        await addToCart(cartlist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [dispatch]);

  async function minusToAnimal(animal) {
    try {
      const response = await fetch(`/api/v1/animals/${animal.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify({ stock: animal.stock - animal.count }),
      });

      if (!response.ok) {
        throw new Error("Failed to update animal stock.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleAddOne(e, animal) {
    e.preventDefault();
    if (animal.stock > 0) {
      dispatch(addOneToCart({ id: animal.id }));
    }
  }

  function handleMinusOne(e, animal) {
    e.preventDefault();
    if (animal.count > 0) {
      dispatch(subtractOneFromCart({ id: animal.id }));
    }
  }

  const [, , , , cleatCartlist] = useLocalStorage("cartlist", []);

  function handleBuyNow(e) {
    e.preventDefault();
    const animalsNeededToBeUpdated = cartState.animals.filter(
      (anim) => anim.count > 0
    );
    animalsNeededToBeUpdated.forEach((element) => {
      minusToAnimal(element);
    });
    cleatCartlist("cartlist");
    setTimeout(() => {
      dispatch(getAnimals());
    }, 100);
    alert("You have successfully bought your animals");
  }

  return (
    <>
      <PageNav />
      <div className={styles.container}>
        <h1 className={styles.heading}>Cart</h1>
        {cartState.loading ? (
          <Spinner />
        ) : (
          <div className={styles.cartItems}>
            {cartState.animals && cartState.animals.length > 0
              ? cartState.animals.map((animal) => (
                  <div key={animal.id} className={styles.cartItem}>
                    <div className={styles.animalInfo}>
                      <div className={styles.animalName}>
                        Animal Name: {animal.name}
                      </div>
                      <div className={styles.animalStock}>
                        In Stock: {animal.stock}
                      </div>
                      <div className={styles.animalCount}>
                        In Cart: {animal.count}
                      </div>
                    </div>
                    <div className={styles.buttons}>
                      <button
                        className={styles.button}
                        onClick={(e) => handleMinusOne(e, animal)}
                      >
                        -
                      </button>
                      <button
                        className={styles.button}
                        onClick={(e) => handleAddOne(e, animal)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              : ""}
            <button className={styles.buyNowButton} onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        )}
      </div>
    </>
  );
}
