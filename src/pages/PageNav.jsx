import { Link } from "react-router-dom";

export default function PageNav() {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          gap: "30px",
          border: "3px solid red",
          padding: "10px",
          justifyContent: "space-around",
        }}
      >
        <li>
          <Link to="/">Main Page</Link>
        </li>
        <li>
          {" "}
          <Link to="/animalsList">Animals List</Link>
        </li>
        <li>
          {" "}
          <Link to="/CategoriesList">Categories List</Link>
        </li>
        <li>
          {" "}
          <Link to="/wishList">Whislist</Link>
        </li>
        <li>
          {" "}
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}
