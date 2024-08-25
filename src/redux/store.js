import { combineReducers, createStore } from "redux";

const animalsInitialState = {
  animals: [],
  animalsWithCategories: [],
};

const categoriesInitialState = {
  categories: [],
};

function animalsReducer(state = animalsInitialState, action) {
  switch (action.type) {
    case "animal/add":
      return { ...state, animals: [...state.animals, action.payload] };
    default:
      return state;
  }
}

function categoriesReducer(state = categoriesInitialState, action) {
  switch (action.type) {
    case "category/add":
      return { ...state, animals: [...state.categories, action.payload] };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  an: animalsReducer,
  ca: categoriesReducer,
});

const store = createStore(rootReducer);

function addAnimal(animal) {
  return { type: "animal/add", payload: animal };
}

function addCategory(category) {
  return { type: "category/add", payload: category };
}

store.dispatch(addAnimal("sosisac"));
store.dispatch(addCategory("hound"));

console.log(store.getState());
