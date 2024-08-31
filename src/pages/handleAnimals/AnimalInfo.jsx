import { useParams } from "react-router-dom";
import PageNav from "../PageNav";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";

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
    fetch(`/api/v1/animals/${animalId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Somethyng went wrong.");
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
    <div>
      <PageNav />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ul>
            <li>Name: {curAnimal.name}</li>
            <li>Description: {curAnimal.description}</li>
            <li>Price: {curAnimal.price}</li>
            <li>Habitat: {curAnimal.habitat}</li>
            <li>{curAnimal.domestic ? "Domestic" : "Wilde"}</li>
            <li>{curAnimal.isPopular ? "Popular" : "Not popular"}</li>
            <li>{curAnimal.carnivore ? "Carnivore" : "Herbivore"}</li>
            <li>{curAnimal.endangered ? "Endangered" : "Not endangered"}</li>
            <li>Stock: {curAnimal.stock}</li>
          </ul>
        </>
      )}
    </div>
  );
}
