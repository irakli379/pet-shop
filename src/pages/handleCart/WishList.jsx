import { useEffect } from "react";
import PageNav from "../PageNav";
import { getAnimals } from "../handleAnimals/animals.thunks";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../UseLocalStorage";
import { addOneToCart } from "./cartSlice";
import { useNavigate } from "react-router-dom";
// import UseLocalStorage from "../UseLocalStorage";

export default function WishList() {
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const [wishlist, addToWishlist, removeFromWishlist, isInWishlist] =
    useLocalStorage("wishlist", []);

  const handleAddToWishlist = (animalName) => {
    addToWishlist(animalName);
  };

  const handleRemoveFromWishlist = (animalName) => {
    removeFromWishlist(animalName);
  };

  const availableAnimals = cartState.animals.filter(
    (animal) => !isInWishlist(animal.name)
  );

  const handleAddToCart = (e, animalName) => {
    removeFromWishlist(animalName);
    const toRemoveAnimal = cartState.animals.find(
      (an) => an.name === animalName
    ).id;
    navigate("/cart");
    console.log(toRemoveAnimal);
    dispatch(addOneToCart({ id: toRemoveAnimal }));

    console.log(cartState.animals.find((e) => e.id === toRemoveAnimal).count);
    setTimeout(() => {
      // navigate("/cart");
      console.log(cartState.animals.find((e) => e.id === toRemoveAnimal).count);
    }, 100);
  };

  function handleAddAllToCart() {}

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnimals());
  }, [dispatch]);

  return (
    <>
      <PageNav />

      <div>
        <h1>Available Animals</h1>
        <ul>
          {availableAnimals.map((animal) => (
            <li key={animal.id}>
              {animal.name} - {animal.count}
              <button onClick={(e) => handleAddToWishlist(animal.name)}>
                Add to Wishlist
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Animals in the Wishlist</h1>
        <ul>
          {wishlist.map((animal) => (
            <li key={animal.id}>
              {animal}
              <button onClick={() => handleRemoveFromWishlist(animal)}>
                Remove From Wishlist
              </button>
              <button onClick={(e) => handleAddToCart(e, animal)}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
