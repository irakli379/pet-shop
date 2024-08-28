import AnimalInfo from "../pages/handleAnimals/AnimalInfo";
import AnimalsList from "../pages/handleAnimals/AnimalsList";
import AddAnimal from "../pages/handleAnimals/AddAnimal";
import CategoriesList from "../pages/handleCategories/CategoriesList";
import AddCategory from "../pages/handleCategories/AddCategory";
import CategoryInfo from "../pages/handleCategories/CategoryInfo";
import UpdateCategory from "../pages/handleCategories/UpdateCategory";
import UpdateAnimal from "../pages/handleAnimals/UpdateAnimal";

import MainPage from "../pages/MainPage";

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
    path: "/animalInfo",
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
    path: "/categoryInfo",
  },
  {
    element: <AddCategory />,
    path: "/addCategory",
  },
  {
    element: <UpdateCategory />,
    path: "/updateCategory",
  },
];

export default routes;
