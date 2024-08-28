import { Link } from "react-router-dom";

export default function PageNav() {
  return (
    <nav>
      <Link to="/">Main Page</Link>
      <Link to="/animalsList">Animals List</Link>
      <Link to="/animalInfo">Animal Info</Link>
      <Link to="/addAnimal">Add Animal</Link>
      <Link to="/CategoriesList">Categories List</Link>
      <Link to="/addCategory">Add Category</Link>
      <Link to="/categoryInfo">Category Info</Link>
      <Link to="/updateCategory">Update Category</Link>
    </nav>
  );
}
