'use client';

import { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalStates, setModalStates] = useState({
    addCocktail: false,
    viewCocktail: { open: false, id: null },
  });

  const openAddCocktailModal = () => {
    setModalStates((prev) => ({
      ...prev,
      addCocktail: true,
    }));
  };

  
  const openViewCocktailModal = (id) => {
    setModalStates((prev) => ({
      ...prev,
      viewCocktail: { open: true, id },
    }));
  };

  const closeModals = () => {
    setModalStates({
      addCocktail: false,
      viewCocktail: { open: false, id: null },
    });
  };

  return (
    <ModalContext.Provider value={{ modalStates, openAddCocktailModal, openViewCocktailModal, closeModals }}>
      {children}
    </ModalContext.Provider>
  );
};