import { createContext, useState } from "react";

export const ShirtsContext = createContext();

export function ShirtsProvider({ children }) {
  const [shirts, setShirts] = useState([]);

  async function fetchShirts() {
    // fetch shirts from your backend or API and update state
  }

  async function addShirt(shirtData) {
    // add a new shirt to the list (e.g., post to backend then update state)
  }

  async function deleteShirt(id) {
    // delete shirt by id (e.g., delete request then update state)
  }

  async function updateShirt(id, newData) {
    // update a shirt's data (e.g., patch request then update state)
  }

  return (
    <ShirtsContext.Provider
      value={{ shirts, fetchShirts, addShirt, deleteShirt, updateShirt }}
    >
      {children}
    </ShirtsContext.Provider>
  );
}
