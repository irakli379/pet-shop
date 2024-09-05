import { useDispatch, useSelector } from "react-redux";
import PageNav from "../PageNav";
import { getAnimals } from "./animals.thunks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import styles from "./AnimalsList.module.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function AnimalsList() {
  const animalsState = useSelector((state) => state.an);
  const cartState = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  function deleteAnimal(animal) {
    fetch(`${API_URL}/api/v1/animals/${animal}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete animal");
        }
        return response.json();
      })
      .then(() => dispatch(getAnimals()))
      .catch((error) => console.error("Error deleting animal:", error));
  }

  useEffect(() => {
    dispatch(getAnimals());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <PageNav />
      {cartState.isLoggedIn && (
        <Link to="/addAnimal" className={styles.addAnimalLink}>
          Add Animal
        </Link>
      )}
      {animalsState.loading ? (
        <Spinner />
      ) : (
        <div className={styles.animalList}>
          {animalsState.animals.length > 0 ? (
            animalsState.animals.map((cf) => (
              <div key={cf._uuid} className={styles.animalCard}>
                <h3>{cf.name}</h3>
                <div className={styles.animalActions}>
                  {cartState.isLoggedIn && (
                    <Link
                      to={`/updateAnimal/${cf._uuid}`}
                      className={styles.animalLink}
                    >
                      Update Animal
                    </Link>
                  )}
                  <Link
                    to={`/animalInfo/${cf._uuid}`}
                    className={styles.animalLink}
                  >
                    See Info
                  </Link>

                  {cartState.isLoggedIn && (
                    <>
                      <button
                        onClick={() => deleteAnimal(cf._uuid)}
                        className={styles.animalButton}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/addAnimalToCategory/${cf._uuid}`}
                        className={styles.animalLink}
                      >
                        Add to Category
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No animals found.</p>
          )}
        </div>
      )}
    </div>
  );
}
