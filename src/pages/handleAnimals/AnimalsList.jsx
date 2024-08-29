import { useDispatch, useSelector } from "react-redux";
import PageNav from "../PageNav";
import { getAnimals } from "./animals.thunks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./AnimalsList.module.css";

export default function AnimalsList() {
  const animalsState = useSelector((state) => state.an.animals);

  const dispatch = useDispatch();

  function deleteAnimal(animal) {
    fetch(`/api/v1/animals/${animal}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    }).then(() => dispatch(getAnimals()));
  }

  useEffect(() => {
    dispatch(getAnimals());
  }, []);

  return (
    <div>
      <PageNav />
      <div className={styles.main_div}>
        <h1 className={styles.header}>Animals List</h1>
        {animalsState.map((cf) => (
         <div className={styles.animals_list} key={cf._uuid}>
            <h3 className={styles.animal}>{cf.name}</h3>
            <Link className={styles.update} to={`/updateAnimal/${cf._uuid}`}>Update</Link>
            <button className={styles.button} onClick={() => deleteAnimal(cf._uuid)}>Delete</button>
          </div>
      ))}
      </div>
    </div>
  );
}
