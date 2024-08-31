import { useDispatch, useSelector } from "react-redux";
import PageNav from "../PageNav";
import { getAnimals } from "../handleAnimals/animals.thunks";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import UseLocalStorage from "../UseLocalStorage";
import { addOneToCart } from "./cartSlice";

export default function Cart() {
  const [numInCart, setNumInCart] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnimals());
  }, [dispatch]);

  const cartState = useSelector((state) => state.cart);

  async function minusOneToAnimal(animal) {
    try {
      const response = await fetch(`/api/v1/animals/${animal.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify({ stock: animal.stock - 1 }),
      });

      if (!response.ok) {
        throw new Error("Failed to update animal stock.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(cartState);

  async function handleAddOne(e, animal) {
    e.preventDefault();
    if (animal.stock > 0) {
      await minusOneToAnimal(animal); // Update the stock on the server
      dispatch(addOneToCart({ id: animal.id })); // Update the cart state locally
    }

    dispatch(getAnimals()); // Optionally re-fetch the updated animals
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
                    {animal.name} {animal.stock} {numInCart}
                  </div>
                  <button onClick={(e) => handleAddOne(e, animal)}>
                    Add one
                  </button>
                </div>
              ))
            : ""}
        </div>
      )}
    </>
  );
}
