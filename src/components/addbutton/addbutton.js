'use client';

import './addbutton.css';
import { ModalContext } from '../modalcontext.js';
import { useContext } from 'react';

const AddButton = () => {
    const { openAddCocktailModal } = useContext(ModalContext);

    return (
        <button 
        className="add-button font-semibold" 
        onClick={openAddCocktailModal}>
            ADD COCKTAIL
        </button>
      );
};

export default AddButton;