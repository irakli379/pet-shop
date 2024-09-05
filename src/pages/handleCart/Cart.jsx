import { useDispatch, useSelector } from "react-redux";
import PageNav from "../PageNav";
import { getAnimals } from "../handleAnimals/animals.thunks";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { addOneToCart, subtractOneFromCart } from "./cartSlice";
import useLocalStorage from "../UseLocalStorage";
import styles from "./Cart.module.css";
import Modal from "./Modal";

const API_URL = process.env.REACT_APP_API_URL;

export default function Cart() {
  const cartState = useSelector((state) => state.cart);
  const animalState = useSelector((state) => state.an);

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

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
      const response = await fetch(`${API_URL}/api/v1/animals/${animal.id}`, {
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
    if (animal.stock - animal.count > 0) {
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

  const animalsToBuy = cartState.animals.filter((animal) => animal.count > 0);
  const str = animalsToBuy.reduce((acc, cur, i, arr) => {
    if (i === arr.length - 1) {
      return acc + `${cur.count} ${cur.count > 1 ? `${cur.name}s` : cur.name}.`;
    }
    return acc + `${cur.count} ${cur.count > 1 ? `${cur.name}s` : cur.name}, `;
  }, "");

  const animalsToBuyNames = cartState.animals
    .filter((animal) => animal.count > 0)
    .reduce((acc, cur) => {
      const foundAnimal = animalState.animals.find(
        (an) => an.name === cur.name
      );
      if (foundAnimal) {
        acc[cur.name] = { price: foundAnimal.price, name: cur.name };
      }
      return acc;
    }, {});

  const calculateTotalPrice = () => {
    return Object.values(animalsToBuyNames).reduce((acc, animal) => {
      const stockAn = cartState.animals.find((cur) => cur.name === animal.name);
      return acc + Number(animal.price) * Number(stockAn.count);
    }, 0);
  };

  function handleBuyNow(e) {
    e.preventDefault();
    const animalsNeededToBeUpdated = cartState.animals.filter(
      (anim) => anim.count > 0
    );

    const total = calculateTotalPrice();
    setTotalPrice(total);

    animalsNeededToBeUpdated.forEach((element) => {
      minusToAnimal(element);
    });

    cleatCartlist("cartlist");

    setTimeout(() => {
      dispatch(getAnimals());
    }, 100);

    setModalMessage(`You have successfully bought: ${str}`);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
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
                  <div
                    key={animal.id}
                    className={
                      animal.stock > 0 ? styles.cartItem : styles.cartItemZero
                    }
                  >
                    <div className={styles.animalInfo}>
                      <div className={styles.animalName}>
                        Animal Name: {animal.name}
                      </div>
                      <div className={styles.animalName}>
                        Animal Price:{" "}
                        {
                          animalState.animals.find(
                            (an) => an.name === animal.name
                          ).price
                        }{" "}
                        {"GEL"}
                      </div>
                      <div className={styles.animalStock}>
                        {animal.stock > 0
                          ? `In Stock: ${animal.stock}`
                          : "Out of stock"}
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
      {showModal && (
        <Modal onClose={closeModal}>
          <p>{modalMessage}</p>
          <p>Total Price: {totalPrice} GEL</p>
        </Modal>
      )}
    </>
  );
}
