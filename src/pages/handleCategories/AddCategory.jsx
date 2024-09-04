import { useState } from "react";
import PageNav from "../PageNav";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postCategory } from "./categories.thunks";
import styles from "./AddCategory.module.css"; // Import the CSS module

export default function AddCategory() {
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
    e.preventDefault(); // Prevent the default form submission
    if (!title || !description || !animalClass || !family) {
      alert("Fill all of the fields");
    } else {
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
    <>
      <PageNav />
      <div className={styles.container}>
        <h1 className={styles.title}>Add Category</h1>
        <form onSubmit={handleSubmitCategoryForm} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="animalClass">Animal Class: </label>
            <select
              id="animalClass"
              value={animalClass}
              onChange={(e) => setAnimalClass(e.target.value)}
              className={styles.select}
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
          <div className={styles.formGroup}>
            <label htmlFor="family">Family: </label>
            <select
              id="family"
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              className={styles.select}
            >
              <option value="Felidae">Felidae (Cats)</option>
              <option value="Felidae">
                Canidae (Dogs, Wolves, Coyotes, African Wild Dogs, etc.)
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
              <option value="Otariidae">
                Otariidae (Sea Lions, Fur Seals)
              </option>
              <option value="Phocidae">Phocidae (True Seals)</option>
              <option value="Odobenidae">Odobenidae (Walrus)</option>
              <option value="other">
                Other (extinct or prehistoric family of species)
              </option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="extinct">Extinct: </label>
            <input
              type="checkbox"
              id="extinct"
              checked={extinct}
              onChange={(e) => setExtinct(e.target.checked)}
              className={styles.checkbox}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
