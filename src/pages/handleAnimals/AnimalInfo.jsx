import { useParams } from "react-router-dom";
import PageNav from "../PageNav";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import styles from "./AnimalInfo.module.css";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export default function AnimalInfo() {
  const { animalId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

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
  });

  function onGetAnimalId() {
    setIsLoading(true);
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
        });
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }

  useEffect(function () {
    onGetAnimalId();
  }, []);

  return (
    <>
      <PageNav />
      <div className={styles.container}>
        {isLoading ? (
          <Spinner className={styles.spinner} />
        ) : (
          <ul className={styles.animalInfoList}>
            <li className={styles.animalInfoItem}>
              <span>Name:</span> {curAnimal.name}
            </li>
            <li className={styles.animalInfoItem}>
              <span>Description:</span> {curAnimal.description}
            </li>
            <li className={styles.animalInfoItem}>
              <span>Price:</span> {curAnimal.price}
            </li>
            <li className={styles.animalInfoItem}>
              <span>Habitat:</span> {curAnimal.habitat}
            </li>
            <li className={styles.animalInfoItem}>
              <span>Domestic:</span> {curAnimal.domestic ? "Domestic" : "Wild"}
            </li>
            <li className={styles.animalInfoItem}>
              <span>Popularity:</span>{" "}
              {curAnimal.isPopular ? "Popular" : "Not popular"}
            </li>
            <li className={styles.animalInfoItem}>
              <span>Diet:</span>{" "}
              {curAnimal.carnivore ? "Carnivore" : "Herbivore"}
            </li>
            <li className={styles.animalInfoItem}>
              <span>Endangered:</span>{" "}
              {curAnimal.endangered ? "Endangered" : "Not endangered"}
            </li>
            <li className={styles.animalInfoItem}>
              <span>Stock:</span> {curAnimal.stock}
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
