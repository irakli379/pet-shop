import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";
import styles from "./AddAnimalToCategory.module.css";
import PageNav from "../PageNav";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export default function AddAnimalToCategory() {
  const [isLoading, setIsLoading] = useState(true);
  const [curCategories, setCurCategories] = useState([]);
  const [curAnimal, setCurAnimal] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    isPopular: false,
    stock: "",
    habitat: "",
    domestic: false,
    carnivore: false,
    endangered: false,
    isInCategory: false,
  });

  const { animalId } = useParams();
  const navigate = useNavigate();

  function onGetCategories() {
    setIsLoading(true);
    fetch(`${API_URL}/api/v1/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong.");
        return res.json();
      })
      .then((data) => {
        setCurCategories(
          data.items.map((category) => ({
            id: category._uuid,
            title: category.title,
            description: category.description,
            animalClass: category.animalClass,
            family: category.family,
            extinct: category.extinct,
            animals: category.animals,
          }))
        );
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  function onGetAnimalId() {
    fetch(`${API_URL}/api/v1/animals/${animalId}`, {
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
        setCurAnimal({
          id: data._uuid,
          name: data.name,
          price: data.price,
          description: data.description,
          isPopular: data.isPopular,
          stock: data.stock,
          habitat: data.habitat,
          domestic: data.domestic,
          carnivore: data.carnivore,
          endangered: data.endangered,
          isInCategory: data.isInCategory,
        });
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    onGetCategories();
    onGetAnimalId();
  }, [animalId]);

  function onUpdateCategories(categoryId) {
    fetch(`${API_URL}/api/v1/categories/${categoryId.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        animals: [...categoryId.animals, curAnimal.name],
      }),
    }).catch((error) => console.log(error));
  }

  function HandleAddToCategory(e, categoryId) {
    e.preventDefault();
    if (!categoryId.animals.includes(curAnimal.name))
      onUpdateCategories(categoryId);

    navigate("/categoriesList");
  }

  return (
    <>
      <PageNav />
      <div className={styles.container}>
        <h1>{curAnimal.name}</h1>
        <div className={styles.categoryList}>
          {isLoading ? (
            <Spinner />
          ) : (
            curCategories.map((cf) => (
              <div key={cf.id} className={styles.categoryItem}>
                <h3>{cf.title}</h3>
                <button
                  onClick={(e) => HandleAddToCategory(e, cf)}
                  className={styles.categoryButton}
                >
                  Add the Animal to {cf.title}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
