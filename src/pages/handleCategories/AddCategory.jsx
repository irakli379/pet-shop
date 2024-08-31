import { useState } from "react";
import PageNav from "../PageNav";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postCategory } from "./categories.thunks";

export default function AddCategory() {
  // const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [animalClass, setAnimalClass] = useState("Mammals");
  const [family, setFamily] = useState("Felidae");
  const [extinct, setExtinct] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newCategory = {
    title,
    description,
    animalClass,
    family,
    extinct,
    animals: [],
  };

  function handleSubmitCategoryForm(e) {
    if (!title || !description || !animalClass || !family) {
      alert("Fill all of the fields");
    } else {
      console.log("add category");
      dispatch(postCategory(newCategory));
    }

    setTitle("");
    setDescription("");
    setAnimalClass("Mammals");
    setFamily("Felidae");
    setExtinct(false);

    navigate("/categoriesList");
  }

  return (
    <div>
      <PageNav />
      <h1>Add Category</h1>
      <form onSubmit={handleSubmitCategoryForm}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <label>Animal Class: </label>
          <select
            type="text"
            value={animalClass}
            onChange={(e) => setAnimalClass(e.target.value)}
          >
            <option value="Mammalia">Mammalia (Mammals)</option>
            <option value="Agnatha">Agnatha (jaw-less fish)</option>
            <option value="Chrondrichtyes">
              Chrondrichtyes (cartilaginous fish)
            </option>
            <option value="Osteichthyes">Osteichthyes (bony fish)</option>
            <option value="Amphibia">Amphibians</option>
            <option value="Reptilia">Reptilians</option>
            <option value="Aves">Aves (Birds)</option>
            <option value="other">
              Other (extinct or prehistoric class of species)
            </option>
          </select>
        </div>
        <div>
          <label>Family: </label>
          <select
            type="text"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
          >
            <option value="Felidae">Felidae (Cats)</option>
            <option value="Felidae">
              Felidae (Dogs, Wolves, Coyotes, African Wild Dogs, etc.)
            </option>
            <option value="Felidae">Ursidae (Bears)</option>
            <option value="Mustelidae">
              Mustelidae (Weasels, Badgers, Otters, etc.)
            </option>
            <option value="Procyonidae">
              Procyonidae (Raccoons, Coatis, Olingos, etc.)
            </option>
            <option value="Mephitidae">
              Mephitidae (Skunks, Stink Badgers)
            </option>
            <option value="Herpestidae">Herpestidae (Mongooses)</option>
            <option value="Hyaenidae">Hyaenidae (Hyenas)</option>
            <option value="Viverridae">
              Viverridae (Civets, Genets, and Linsangs)
            </option>
            <option value="Otariidae">Otariidae (Sea Lions, Fur Seals)</option>
            <option value="Phocidae">Phocidae (True Seals)</option>
            <option value="Odobenidae">Odobenidae (Walrus)</option>
            <option value="other">
              Other (extinct or prehistoric family of species)
            </option>
          </select>
        </div>
        <div>
          <label>Extinct: </label>

          <input
            type="checkbox"
            checked={extinct}
            onChange={(e) => setExtinct(e.target.checked)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
