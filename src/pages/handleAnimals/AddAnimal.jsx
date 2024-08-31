import { useState } from "react";
import PageNav from "../PageNav";
import { useNavigate } from "react-router-dom";
import { postAnimal } from "./animals.thunks";
import { useDispatch } from "react-redux";

function isValidNumber(value) {
  const number = Number(value);
  return !isNaN(number) && isFinite(number);
}

export default function AddAnimal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const [stock, setStock] = useState("");
  const [habitat, setHabitat] = useState("universal");
  const [domestic, setDomestic] = useState(false);
  const [carnivore, setCarnivore] = useState(false);
  const [endangered, setEndangered] = useState(false);

  const [isInCategory, setIsInCategory] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newAnimal = {
    name,
    price,
    description,
    isPopular,
    stock,
    habitat,
    domestic,
    carnivore,
    endangered,
    isInCategory,
  };

  function handleSubmitAnimalForm(e) {
    e.preventDefault();

    if (!name || !description || !price || !stock) {
      alert("Fill all of the fields");
    } else if (!isValidNumber(price)) {
      alert("The Price must be a valid number");
    } else if (!isValidNumber(stock) || stock < 0) {
      alert("The stock must be a valid number");
    } else {
      dispatch(postAnimal(newAnimal));
    }

    setName("");
    setDescription("");
    setPrice("");
    setIsPopular(false);
    setStock("");
    setHabitat("universal");
    setDomestic(false);
    setCarnivore(false);
    setEndangered(false);

    if (
      !(
        !name ||
        !description ||
        !price ||
        !isValidNumber(price) ||
        !isValidNumber(stock)
      )
    )
      navigate("/animalsList");
  }

  return (
    <div>
      <PageNav />
      <h1>Add Animal</h1>
      <div className="inputs">
        <form onSubmit={handleSubmitAnimalForm}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Description: </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Price: </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Is the animal popular: </label>
            <input
              type="checkbox"
              checked={isPopular}
              onChange={(e) => setIsPopular(e.target.checked)}
            />
          </div>
          <div>
            <label>Stock: </label>
            <input
              type="text"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div>
            <label>Habitat: </label>
            <select
              value={habitat}
              onChange={(e) => setHabitat(e.target.value)}
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
              checked={domestic}
              onChange={(e) => setDomestic(e.target.checked)}
            />
          </div>
          <div>
            <label>Carnivore: </label>
            <input
              type="checkbox"
              checked={carnivore}
              onChange={(e) => setCarnivore(e.target.checked)}
            />
          </div>
          <div>
            <label>Endangered: </label>
            <input
              type="checkbox"
              checked={endangered}
              onChange={(e) => setEndangered(e.target.checked)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
