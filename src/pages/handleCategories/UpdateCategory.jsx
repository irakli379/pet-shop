import { useEffect, useState } from "react";
import PageNav from "../PageNav";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCategory } from "./categories.thunks";

export default function UpdateCategory() {
  const [curCategory, setCurCategory] = useState({
    id: "",
    title: "",
    description: "",
    animalClass: "",
    family: "",
    extinct: false,
    animals: [],
  });

  const navigate = useNavigate();

  const { categoryId } = useParams();
  const dispatch = useDispatch();

  function onGetCategoryId() {
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
      .catch((error) => console.log(error));
  }

  useEffect(function () {
    onGetCategoryId();
  }, []);

  function handleUpdateCategory(e) {
    e.preventDefault();

    if (
      !curCategory.title ||
      !curCategory.description ||
      !curCategory.animalClass ||
      !curCategory.family
    ) {
      alert("Fill all of the fields");
    } else {
      dispatch(updateCategory(curCategory));
      navigate("/categoriesList");
    }
  }

  return (
    <div>
      <PageNav />
      <h1>Update Category</h1>
      <form onSubmit={handleUpdateCategory}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={curCategory.title}
            onChange={(e) =>
              setCurCategory((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={curCategory.description}
            onChange={(e) =>
              setCurCategory((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>Animal Class: </label>
          <select
            type="text"
            value={curCategory.animalClass}
            onChange={(e) =>
              setCurCategory((prev) => ({
                ...prev,
                animalClass: e.target.value,
              }))
            }
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
              Other (extinct or prehistoric species)
            </option>
          </select>
        </div>
        <div>
          <label>Family: </label>
          <select
            type="text"
            value={curCategory.family}
            onChange={(e) =>
              setCurCategory((prev) => ({ ...prev, family: e.target.value }))
            }
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
          </select>
        </div>
        <div>
          <label>Extinct: </label>

          <input
            type="checkbox"
            checked={curCategory.extinct}
            onChange={(e) =>
              setCurCategory((prev) => ({ ...prev, extinct: e.target.checked }))
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
