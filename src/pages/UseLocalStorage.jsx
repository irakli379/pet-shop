import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage value:", error);
    }
  };

  const addToWishlist = (animalName) => {
    const lowercaseName = animalName.toLowerCase();
    if (!storedValue.includes(lowercaseName)) {
      setValue([...storedValue, lowercaseName]);
    }
  };

  const removeFromWishlist = (animalName) => {
    const lowercaseName = animalName.toLowerCase();
    setValue(storedValue.filter((name) => name !== lowercaseName));
  };

  const isInWishlist = (animalName) => {
    return storedValue.includes(animalName.toLowerCase());
  };

  return [storedValue, addToWishlist, removeFromWishlist, isInWishlist];
}

export default useLocalStorage;
