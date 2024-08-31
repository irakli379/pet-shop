import { useParams } from "react-router-dom";
import PageNav from "../PageNav";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";

export default function CategoryInfo() {
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

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
    fetch(`/api/v1/categories/${categoryId}`, {
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

  console.log(curCategory.animals);

  return (
    <div>
      <PageNav />
      <h1>Category Info</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ul>
            <li>Title: {curCategory.title}</li>
            <li>Description: {curCategory.description}</li>

            {curCategory.animalClass === "other" ? (
              ""
            ) : (
              <li>{`Animal Class: ${curCategory.animalClass}`}</li>
            )}

            {curCategory.family === "other" ? (
              ""
            ) : (
              <li>{`Family: ${curCategory.family}`}</li>
            )}

            <li>{curCategory.extinct ? "Extinct" : "Not extinct"}</li>

            {curCategory.animals === undefined ? (
              ""
            ) : curCategory.animals.length > 0 ? (
              <ul>
                {curCategory.animals.map((animal) => (
                  <li>{animal}</li>
                ))}
              </ul>
            ) : (
              ""
            )}
          </ul>
        </>
      )}
    </div>
  );
}
