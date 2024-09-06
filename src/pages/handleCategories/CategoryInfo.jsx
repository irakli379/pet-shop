import { useParams } from "react-router-dom";
import PageNav from "../PageNav";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "./categories.thunks";
import styles from "./CategoryInfo.module.css";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export default function CategoryInfo() {
  const cartState = useSelector((state) => state.cart);

  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const [curCategory, setCurCategory] = useState({
    id: "",
    title: "",
    description: "",
    animalClass: "",
    family: "",
    extinct: false,
    animals: [],
  });

  function onGetCategoryId() {
    setIsLoading(true);
    fetch(`${API_URL}/api/v1/categories/${categoryId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong.");
        return res.json();
      })
      .then((data) => {
        setCurCategory({
          id: data._uuid,
          title: data.title,
          description: data.description,
          animalClass: data.animalClass,
          family: data.family,
          extinct: data.extinct,
          animals: data.animals,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  useEffect(function () {
    onGetCategoryId();
  }, []);

  function handleRemoveFromAnimals(e, animalToRemove) {
    e.preventDefault();
    const updatedAnimals = curCategory.animals.filter(
      (animal) => animal !== animalToRemove
    );

    const updatedCategory = {
      ...curCategory,
      animals: updatedAnimals,
    };

    dispatch(updateCategory(updatedCategory))
      .then(() => {
        setCurCategory(updatedCategory);
      })
      .catch((error) => console.error("Failed to remove animal:", error));
    onGetCategoryId();
  }

  return (
    <div className={styles.container}>
      <PageNav />
      <h1 className={styles.title}>Category Info</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ul className={styles.categoryInfo}>
            <li className={styles.categoryItem}>
              <strong>Title:</strong> {curCategory.title}
            </li>
            <li className={styles.categoryItem}>
              <strong>Description:</strong> {curCategory.description}
            </li>
            {curCategory.animalClass !== "other" && (
              <li className={styles.categoryItem}>
                <strong>Animal Class:</strong> {curCategory.animalClass}
              </li>
            )}
            {curCategory.family !== "other" && (
              <li className={styles.categoryItem}>
                <strong>Family:</strong> {curCategory.family}
              </li>
            )}
            <li className={styles.categoryItem}>
              <strong>Status:</strong>{" "}
              {curCategory.extinct ? "Extinct" : "Not extinct"}
            </li>
          </ul>
          {curCategory.animals && curCategory.animals.length > 0 && (
            <div className={styles.animalList}>
              <h2 className={styles.animalListTitle}>
                Animals in this Category
              </h2>
              <ul className={styles.animalCards}>
                {curCategory.animals.map((animal) => (
                  <li key={animal} className={styles.animalCard}>
                    <div className={styles.animalCardContent}>
                      <span className={styles.animalName}>{animal}</span>
                      {cartState.isLoggedIn && (
                        <button
                          onClick={(e) => handleRemoveFromAnimals(e, animal)}
                          className={styles.removeButton}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
