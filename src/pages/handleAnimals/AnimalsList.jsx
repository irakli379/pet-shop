import { useDispatch, useSelector } from "react-redux";
import PageNav from "../PageNav";
import { getAnimals } from "./animals.thunks";
import { useEffect } from "react";

export default function AnimalsList() {
  const animalsState = useSelector((state) => state.an.animals);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnimals());
  }, []);

  console.log(animalsState);

  return (
    <div>
      <PageNav />
      <h1>Animals List</h1>
      {animalsState.map((cf) => (
        <div key={cf._uuid}>
          <h3>{cf.name}</h3>
        </div>
      ))}
    </div>
  );
}
