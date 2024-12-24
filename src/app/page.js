'use client';

import { CocktailModal } from '../components/modal/modal.js';
import { CocktailCard } from '../components/cocktailcard/cocktailcard.js';
import { SearchBar } from '../components/searchbar/searchbar.js';
import { NextPrevButton } from '../components/nextprevbutton/nextprevbutton.js';
import { ModalContext } from '../components/modalcontext.js';
import { useContext, useEffect } from 'react';
import { useCocktailPagination } from '../components/usecocktailpagination.js';

export default function App() {
  const { modalStates, closeModals, openViewCocktailModal } = useContext(ModalContext);
  const { cocktails, page, handleNextPage, handlePrevPage, handleSearch, fetchCocktails, totalPages, resetPage } = useCocktailPagination();
  
  useEffect(() => {
    fetchCocktails(page);
  }, []);

  return (
    <>
      <SearchBar handleSearch={handleSearch} cocktails={cocktails} />

      <div>
        {cocktails.map((cocktail) => (
            <CocktailCard 
              key={cocktail.id} 
              cocktail={cocktail}
              onClick={() => openViewCocktailModal(cocktail.id)} 
            />
        ))}
      </div>

      <CocktailModal
        isOpen={modalStates.addCocktail || modalStates.viewCocktail.open}
        onClose={closeModals}
        cocktailId={modalStates.viewCocktail.id}
        modalType={modalStates.addCocktail ? 'add' : 'view'}
        resetPage={resetPage}
      />

      <div className='mt-[90px] mb-[50px] flex justify-end space-x-[30px]'>
        <NextPrevButton 
          onClick={handlePrevPage} 
          isNext={false}
          page={page}
          totalPages={totalPages}
        />
        <NextPrevButton 
          onClick={handleNextPage} 
          isNext={true}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}