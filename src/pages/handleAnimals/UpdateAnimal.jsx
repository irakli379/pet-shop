import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateAnimal } from "./animals.thunks";
import PageNav from "../PageNav";
import styles from "./UpdateAnimal.module.css";

function isValidNumber(value) {
  const number = Number(value);
  return !isNaN(number) && isFinite(number);
}

const API_URL = process.env.REACT_APP_API_URL;

export default function UpdateAnimal() {
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
    isInCategory: false,
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { animalId } = useParams();
  const dispatch = useDispatch();

  function onGetAnimalId() {
    fetch(`${API_URL}/api/v1/animals/${animalId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong.");
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
          isInCategory: data.isInCategory,
        });
      })
      .catch((error) => console.log(error));
  }

  useEffect(function () {
    onGetAnimalId();
  }, []);

  function handleUpdateAnimal(e) {
    e.preventDefault();

    if (
      !curAnimal.name ||
      !curAnimal.description ||
      !curAnimal.price ||
      !curAnimal.stock
    ) {
      setError("Fill all of the fields");
    } else if (
      !isValidNumber(curAnimal.price) ||
      !isValidNumber(curAnimal.stock)
    ) {
      setError("The Price must be a valid number");
    } else {
      setError("");
      dispatch(updateAnimal(curAnimal));
      navigate("/animalsList");
    }
  }

  return (
    <>
      <PageNav className={styles.pageNav} />
      <div className={styles.container}>
        <h1>Update Animal</h1>
        <form onSubmit={handleUpdateAnimal} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Name:</label>
            <input
              type="text"
              value={curAnimal.name}
              onChange={(e) =>
                setCurAnimal((prev) => ({ ...prev, name: e.target.value }))
              }
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description:</label>
            <input
              type="text"
              value={curAnimal.description}
              onChange={(e) =>
                setCurAnimal((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Price:</label>
            <input
              type="text"
              value={curAnimal.price}
              onChange={(e) =>
                setCurAnimal((prev) => ({ ...prev, price: e.target.value }))
              }
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Is the animal popular:</label>
            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="isPopular"
                checked={curAnimal.isPopular}
                onChange={(e) =>
                  setCurAnimal((prev) => ({
                    ...prev,
                    isPopular: e.target.checked,
                  }))
                }
                className={styles.checkbox}
              />
              <label
                htmlFor="isPopular"
                className={styles.customCheckbox}
              ></label>
              <label htmlFor="isPopular" className={styles.checkboxLabel}>
                Popular
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Stock:</label>
            <input
              type="text"
              value={curAnimal.stock}
              onChange={(e) =>
                setCurAnimal((prev) => ({ ...prev, stock: e.target.value }))
              }
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Habitat:</label>
            <select
              value={curAnimal.habitat}
              onChange={(e) =>
                setCurAnimal((prev) => ({ ...prev, habitat: e.target.value }))
              }
              className={styles.select}
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
          <div className={styles.formGroup}>
            <label className={styles.label}>Domestic:</label>
            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="domestic"
                checked={curAnimal.domestic}
                onChange={(e) =>
                  setCurAnimal((prev) => ({
                    ...prev,
                    domestic: e.target.checked,
                  }))
                }
                className={styles.checkbox}
              />
              <label
                htmlFor="domestic"
                className={styles.customCheckbox}
              ></label>
              <label htmlFor="domestic" className={styles.checkboxLabel}>
                Domestic
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Carnivore:</label>
            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="carnivore"
                checked={curAnimal.carnivore}
                onChange={(e) =>
                  setCurAnimal((prev) => ({
                    ...prev,
                    carnivore: e.target.checked,
                  }))
                }
                className={styles.checkbox}
              />
              <label
                htmlFor="carnivore"
                className={styles.customCheckbox}
              ></label>
              <label htmlFor="carnivore" className={styles.checkboxLabel}>
                Carnivore
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Endangered:</label>
            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="endangered"
                checked={curAnimal.endangered}
                onChange={(e) =>
                  setCurAnimal((prev) => ({
                    ...prev,
                    endangered: e.target.checked,
                  }))
                }
                className={styles.checkbox}
              />
              <label
                htmlFor="endangered"
                className={styles.customCheckbox}
              ></label>
              <label htmlFor="endangered" className={styles.checkboxLabel}>
                Endangered
              </label>
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
