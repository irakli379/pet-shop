import { useDispatch, useSelector } from "react-redux";
import PageNav from "../PageNav";
import { getCategories } from "./categories.thunks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import styles from "./CategoriesList.module.css";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export default function CategoriesList() {
  const categoriesState = useSelector((state) => state.ca);
  const cartState = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  function deleteCategory(category) {
    fetch(`${API_URL}/api/v1/categories/${category}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }).then(() => dispatch(getCategories()));
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <PageNav />
      {cartState.isLoggedIn && (
        <Link to={"/addCategory"} className={styles.addCategoryLink}>
          Add Category
        </Link>
      )}
      {categoriesState.loading ? (
        <Spinner />
      ) : categoriesState.categories.length === 0 ? (
        <h4 className={styles.emptyMessage}>Add a Category</h4>
      ) : (
        categoriesState.categories.map((cf) => (
          <div key={cf._uuid} className={styles.categoryCard}>
            <h3 className={styles.categoryTitle}>{cf.title}</h3>
            {cartState.isLoggedIn && (
              <Link
                to={`/updateCategory/${cf._uuid}`}
                className={styles.updateLink}
              >
                Update Category
              </Link>
            )}
            <Link to={`/categoryInfo/${cf._uuid}`} className={styles.infoLink}>
              See Info
            </Link>
            {cartState.isLoggedIn && (
              <button
                onClick={() => deleteCategory(cf._uuid)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
