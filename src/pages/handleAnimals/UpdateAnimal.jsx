import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateAnimal } from "./animals.thunks";

function isValidNumber(value) {
  const number = Number(value);
  return !isNaN(number) && isFinite(number);
}

export default function UpdateAnimal() {
  const [curAnimal, setCurAnimal] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    isPopular: false,
    stock: false,
    habitat: "",
    domestic: false,
    carnivore: false,
    endangered: false,
  });

  const navigate = useNavigate();

  const { animalId } = useParams();
  const dispatch = useDispatch();

  console.log(animalId);

  function onGetAnimalId() {
    // setIsLoading(true);
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
        console.log(data);
        setCurAnimal({
          Name: data.Name,
          Description: data.Description,
          Price: data.Price,
          Id: data._uuid,
          isVegan: data.isVegan,
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
      .catch((error) => console.log(error));
    // .finally(() => setIsLoading(false));
  }

  useEffect(function () {
    onGetAnimalId();
  }, []);

  function handleUpdateAnimal(e) {
    e.preventDefault();

    if (!curAnimal.name || !curAnimal.description || !curAnimal.price) {
      alert("Fill all of the fields");
    } else if (!isValidNumber(curAnimal.price)) {
      alert("The Price must be a valid number");
    } else {
      dispatch(updateAnimal(curAnimal));
      navigate("/animalsList");
    }
  }

  return (
    <div>
      Update Animal
      <div className="inputs">
        <form onSubmit={handleUpdateAnimal}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={curAnimal.name}
              onChange={(e) =>
                setCurAnimal((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Description: </label>
            <input
              type="text"
              value={curAnimal.description}
              onChange={(e) =>
                setCurAnimal((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Price: </label>
            <input
              type="text"
              value={curAnimal.price}
              onChange={(e) =>
                setCurAnimal((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Is the animal popular: </label>
            <input
              type="checkbox"
              checked={curAnimal.isPopular}
              onChange={(e) =>
                setCurAnimal((prev) => ({ ...prev, isPopular: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Stock: </label>
            <input
              type="checkbox"
              checked={curAnimal.stock}
              value={curAnimal.stock}
              onChange={(e) =>
                setCurAnimal((prev) => ({ ...prev, stock: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Habitat: </label>
            <select
              value={curAnimal.habitat}
              onChange={(e) =>
                setCurAnimal((prev) => ({ ...prev, habitat: e.target.value }))
              }
            >
              <option value="universal">Universal</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="australiaAndOceania">Australia and Oceania</option>
              <option value="americas">Americas</option>
              <option value="antarctica">Antarctica</option>
              <option value="arctic">Arctic</option>
            </select>
          </div>
          <div>
            <label>Domestic: </label>

            <input
              type="checkbox"
              checked={curAnimal.domestic}
              onChange={(e) =>
                setCurAnimal((prev) => ({ ...prev, domestic: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Carnivore: </label>
            <input
              type="checkbox"
              checked={curAnimal.carnivore}
              onChange={(e) =>
                setCurAnimal((prev) => ({ ...prev, carnivore: e.target.value }))
              }
            />
          </div>
          <div>
            <label>Endangered: </label>
            <input
              type="checkbox"
              checked={curAnimal.endangered}
              onChange={(e) =>
                setCurAnimal((prev) => ({
                  ...prev,
                  endangered: e.target.value,
                }))
              }
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
