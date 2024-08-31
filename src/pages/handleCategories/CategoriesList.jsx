import { useDispatch, useSelector } from "react-redux";
import PageNav from "../PageNav";
import { getCategories } from "./categories.thunks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

export default function CategoriesList() {
  const categoriesState = useSelector((state) => state.ca);

  const dispatch = useDispatch();
  console.log(categoriesState);

  function deleteCategory(category) {
    fetch(`/api/v1/categories/${category}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    }).then(() => dispatch(getCategories()));
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <PageNav />
      <Link to={"/addCategory"}>Add Category</Link>
      {categoriesState.loading ? (
        <Spinner />
      ) : categoriesState.categories.length === 0 ? (
        <h4>Add a Categoory</h4>
      ) : (
        categoriesState.categories.map((cf) => (
          <div key={cf._uuid}>
            <h3>{cf.title}</h3>
            <Link to={`/updateCategory/${cf._uuid}`}>Update Animal</Link>
            <Link to={`/categoryInfo/${cf._uuid}`}>See Info</Link>
            <button onClick={() => deleteCategory(cf._uuid)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

// const handleAddOne = useCallback(
//   function (e, animal) {
//     e.preventDefault();
//     minusOneToAnimal(animal);
//     dispatch(getAnimals());
//   },
//   [dispatch]
// );

// useEffect(()=> {
//   function handleAddOne(e, animal) {
//       e.preventDefault();
//       minusOneToAnimal(animal);
//       dispatch(getAnimals());
//     }
// }, [])
