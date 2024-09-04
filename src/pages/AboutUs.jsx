import { useEffect } from "react";
import PageNav from "./PageNav";
import { useDispatch, useSelector } from "react-redux";
import { getAnimals } from "./handleAnimals/animals.thunks";
import styles from "./AboutUs.module.css"; // Import the CSS module

export default function AboutUs() {
  const animalsState = useSelector((state) => state.an);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnimals());
  }, [dispatch]);

  return (
    <div>
      <PageNav />
      <h1 className={styles.heading}>About Us</h1>
      <p className={styles.content}>
        Welcome to our pet shop! We are dedicated to providing the best
        experience for animal lovers. Our mission is to connect people with
        their perfect companions. Whether you're looking for a furry friend, a
        feathery companion, or a scaly sidekick, we've got you covered. Below
        are some of our most popular animals:
      </p>
      <div className={styles.popularAnimals}>
        {animalsState.animals
          .filter((cur) => cur.isPopular)
          .map((animal) => (
            <div key={animal.id} className={styles.animalCard}>
              {animal.name}
            </div>
          ))}
      </div>
    </div>
  );
}
