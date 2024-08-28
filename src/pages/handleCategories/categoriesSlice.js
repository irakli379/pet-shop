const categoriesInitialState = {
  categories: [],
};

export default function categoriesReducer(
  state = categoriesInitialState,
  action
) {
  switch (action.type) {
    case "category/add":
      return { ...state, animals: [...state.categories, action.payload] };
    default:
      return state;
  }
}

export function addCategory(category) {
  return { type: "category/add", payload: category };
}
