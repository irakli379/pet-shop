import { useDispatch, useSelector } from "react-redux";
import PageNav from "../PageNav";
import { getAnimals } from "../handleAnimals/animals.thunks";
import { useEffect } from "react";
import Spinner from "../Spinner";
import { addOneToCart, subtractOneFromCart } from "./cartSlice";

export default function Cart() {
  const cartState = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnimals());
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
      console.log(cartState);
    }
  }

  function handleMinusOne(e, animal) {
    e.preventDefault();
    if (animal.count > 0) {
      dispatch(subtractOneFromCart({ id: animal.id }));
      console.log(cartState);
    }
  }

  function handleBuyNow(e) {
    e.preventDefault();
    const animalsNeededToBeUpdated = cartState.animals.filter(
      (anim) => anim.count > 0
    );
    animalsNeededToBeUpdated.forEach((element) => {
      minusToAnimal(element);
    });
    setTimeout(() => {
      dispatch(getAnimals());
    }, 100);
  }

  return (
    <>
      <PageNav />
      <h1>Cart</h1>
      {cartState.loading ? (
        <Spinner />
      ) : (
        <div>
          {cartState.animals && cartState.animals.length > 0
            ? cartState.animals.map((animal) => (
                <div key={animal.id}>
                  <div>
                    {animal.name} {animal.stock} {animal.count}
                  </div>
                  <button onClick={(e) => handleMinusOne(e, animal)}>-</button>
                  <button onClick={(e) => handleAddOne(e, animal)}>+</button>
                </div>
              ))
            : ""}
          <button onClick={handleBuyNow}>Buy Now</button>
        </div>
      )}
    </>
  );
}
