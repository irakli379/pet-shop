import { useDispatch, useSelector } from "react-redux";
import PageNav from "../PageNav";
import { getAnimals } from "./animals.thunks";
import { useEffect } from "react";
import { Link } from "react-router-dom";

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
      <h1>Animals List</h1>
      {animalsState.map((cf) => (
        <div key={cf._uuid}>
          <h3>{cf.name}</h3>
          <Link to={`/updateAnimal/${cf._uuid}`}>Update Animal</Link>
          <button onClick={() => deleteAnimal(cf._uuid)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
