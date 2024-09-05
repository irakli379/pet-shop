import AnimalInfo from "../pages/handleAnimals/AnimalInfo";
import AnimalsList from "../pages/handleAnimals/AnimalsList";
import AddAnimal from "../pages/handleAnimals/AddAnimal";
import CategoriesList from "../pages/handleCategories/CategoriesList";
import AddCategory from "../pages/handleCategories/AddCategory";
import CategoryInfo from "../pages/handleCategories/CategoryInfo";
import UpdateCategory from "../pages/handleCategories/UpdateCategory";
import UpdateAnimal from "../pages/handleAnimals/UpdateAnimal";
import MainPage from "../pages/MainPage.jsx";

import AddAnimalToCategory from "../pages/handleAnimals/AddAnimalToCategory";
import AboutUs from "../pages/AboutUs";
import Donate from "../pages/Donate";
import WishList from "../pages/handleCart/WishList";
import Cart from "../pages/handleCart/Cart";

const routes = [
  {
    element: <MainPage />,
    path: "/",
  },
  {
    element: <AnimalsList />,
    path: "/animalsList",
  },
  {
    element: <AnimalInfo />,
    path: "/animalInfo/:animalId",
  },
  {
    element: <AddAnimal />,
    path: "/addAnimal",
  },
  {
    element: <UpdateAnimal />,
    path: "/updateAnimal/:animalId",
  },
  {
    element: <CategoriesList />,
    path: "/categoriesList",
  },
  {
    element: <CategoryInfo />,
    path: "/categoryInfo/:categoryId",
  },
  {
    element: <AddCategory />,
    path: "/addCategory",
  },
  {
    element: <UpdateCategory />,
    path: "/updateCategory/:categoryId",
  },
  {
    element: <AddAnimalToCategory />,
    path: "/addAnimalToCategory/:animalId",
  },
  {
    element: <AboutUs />,
    path: "/aboutUs",
  },
  {
    element: <Donate />,
    path: "/donate",
  },
  {
    element: <WishList />,
    path: "/wishList",
  },
  {
    element: <Cart />,
    path: "/cart",
  },
];

export default routes;
