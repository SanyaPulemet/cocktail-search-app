import { useEffect, useState, useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { ModalContext } from '../modalcontext.js';
import { IngredientInputAddModal } from '../ingredientinputaddmodal/ingredientinputaddmodal.js';
import { useCocktailPagination } from '../usecocktailpagination.js';

export const CocktailModal = ({ isOpen, onClose, cocktailId, modalType, resetPage }) => {
  const [cocktail, setCocktail] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { modalStates, openViewCocktailModal } = useContext(ModalContext);
  const { page, fetchCocktails } = useCocktailPagination();

  useEffect(() => {
    if (modalType === 'view' && cocktailId) {
      fetch(`/api/cocktails/${cocktailId}?id=${cocktailId}`)
        .then((response) => response.json())
        .then((data) => setCocktail(data))
        .catch((error) => console.error('fetch error', error));
    }
  }, [cocktailId, modalType, isEditing]);

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
  
    try {
      const cocktailResponse = await fetch(
        `/api/cocktails/${cocktailId}?id=${cocktailId}`,
        {
          method: 'PUT',
          body: formData,
        },
      );
  
      if (!cocktailResponse.ok) throw new Error('!response.ok');
  
      const updatedCocktail = await cocktailResponse.json();

      const ingredientsResponse = await fetch(
        `/api/cocktails/ingredient?cocktailId=${cocktailId}`,
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!ingredientsResponse.ok) throw new Error('!response.ok');

      onClose();
      setIsEditing(false);
      setCocktail({ ...cocktail, image: updatedCocktail.image });
      cocktailId = updatedCocktail.id;
      modalType = 'view';
      modalStates.viewCocktail.open;
      resetPage();
      openViewCocktailModal(cocktailId);
    } catch (error) {
      console.error('error updating cocktail', error);
    }
  };

  const handleAddClick = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch('/api/cocktails', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) throw new Error('!response.ok');
      
      const newCocktail = await response.json();
      onClose();
      cocktailId = newCocktail.id;
      modalType = 'view';
      modalStates.viewCocktail.open;
      resetPage();
      openViewCocktailModal(cocktailId);
    } catch (error) {
      console.error(error);
      alert('error creating cocktail', error);
    }
  };

  const renderContent = () => {
    if (modalType === 'add') {
      return (
        <>
        <form onSubmit={handleAddClick}>
          <div className="relative flex">
            <div>
              <div className="relative w-[426px] h-[450px]">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  id="fileInput"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <label
                  htmlFor="fileInput"
                  className="block w-full h-full rounded-lg overflow-hidden cursor-pointer"
                >
                  <img src='/pic.png' alt='image'
                  className="object-cover w-full h-full" />
                </label>
              </div>
              <IngredientInputAddModal />
            </div>
            <div className='mt-[85px] ml-[35px] max-w-[964px]'>
              <input
                type='text'
                name='name'
                placeholder='name'
                className='w-full border-b-[2px] border-[#B0B0B0] bg-transparent focus:outline-none mb-[40px] font-poppins font-medium text-[40px]'
                required
              />
              <textarea
                placeholder='description'
                name='description' 
                className='w-full border-b-[2px] border-[#B0B0B0] bg-transparent focus:outline-none mb-[40px] min-h-[152px] font-poppins font-light text-[40px]'
              />
              <textarea 
                placeholder='recipe'
                name='recipe' 
                className='w-full border-b-[2px] border-[#B0B0B0] bg-transparent focus:outline-none min-h-[235px] font-poppins font-light text-[30px]'
              />
            </div>
          </div>
          <button 
            type='submit'
            className='absolute top-[58px] right-[155px] font-poppins font-thin text-[40px]'
          >SAVE</button>
        </form>
        </>
      );
    }
  
    if (isEditing) {
      return (
        <form onSubmit={handleSaveClick}>
          <div className="relative flex">
            <div>
              <div className="relative w-[426px] h-[450px]">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  id="fileInput"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <label
                  htmlFor="fileInput"
                  className="block w-full h-full rounded-lg overflow-hidden cursor-pointer"
                >
                  <img src={`/uploads/${cocktail?.image}`} alt={cocktail?.name}
                  className="object-cover w-full h-full" />
                </label>
              </div>
              <IngredientInputAddModal 
                  isEditing={isEditing}
                  ingredients={cocktail.ingredients}
                  cocktailId={cocktailId}
              />
            </div>
            <div className='mt-[85px] ml-[35px] max-w-[964px]'>
              <input
                type='text'
                name='name'
                value={cocktail.name}
                onChange={(e) =>
                  setCocktail({ ...cocktail, name: e.target.value })
                }
                className='w-full border-b-[2px] border-[#B0B0B0] bg-transparent focus:outline-none mb-[40px] font-poppins font-medium text-[40px]'
                required
              />
              <textarea
                value={cocktail.description}
                name='description' 
                onChange={(e) =>
                  setCocktail({ ...cocktail, description: e.target.value })
                }
                className='w-full border-b-[2px] border-[#B0B0B0] bg-transparent focus:outline-none mb-[40px] min-h-[152px] font-poppins font-light text-[40px]'
              />
              <textarea 
                value={cocktail.recipe}
                name='recipe' 
                onChange={(e) =>
                  setCocktail({ ...cocktail, recipe: e.target.value })
                }
                className='w-full border-b-[2px] border-[#B0B0B0] bg-transparent focus:outline-none min-h-[235px] font-poppins font-light text-[30px]'
              />
            </div>
          </div>
          <button 
            type='submit'
            className='absolute top-[58px] right-[155px] font-poppins font-thin text-[40px]'
          >SAVE</button>
        </form>
      );
    }

    return ( //сроки горят, так что я не буду разносить это по компонентам, простите
      <>
      <div className="relative flex">
        <div>
          <img
            src={`/uploads/${cocktail?.image}`}
            alt={cocktail?.name}
            className="w-[426px] h-[450px] object-cover rounded-lg"
          />
          <div
            className='mt-[27px] bg-[#141414] min-h-[313px] rounded-lg pt-[20px] pl-[20px] font-poppins font-medium text-[30px] max-w-[426px]'
          >
            INGREDIENTS
            <div
              className='mt-[13px] ml-[20px]'
            >
              {cocktail?.ingredients.map((ingredient) => ( //ключ id связи
                <div 
                  key={ingredient.id}
                > 
                  ● {ingredient.ingredient.name} - {ingredient.amountOz} OZ
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className='mt-[85px] ml-[35px]'
        >
          <div
            className='mb-[40px] font-poppins font-medium text-[40px]'
          >{cocktail?.name}</div>
          <div
            className='mb-[40px] min-h-[152px] font-poppins font-light text-[40px]'
          >{cocktail?.description}</div>
          <div
            className='min-h-[425px] font-poppins font-light text-[30px]'
          >{cocktail?.recipe}</div>
        </div>
      </div>
      <button 
        onClick={handleEditClick}
        className='absolute top-[58px] right-[155px] font-poppins font-thin text-[40px]'
      >CHANGE</button>
      </>
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className='fixed inset-0 flex items-center justify-center'
    >
      <div
        className='fixed inset-0 bg-[#676767] opacity-60'
        aria-hidden='true'
      ></div>
      <div className='relative bg-[#232324] rounded-lg p-[60px] z-10 w-[1590px] min-h-[910px]'>
        {renderContent()}
        <button 
          onClick={handleClose}
          className='absolute top-[60px] right-[60px]'
        >
          <img
            src='/exit.svg'
            alt='exit'
            className="w-[45px] h-[45px]"
          />
        </button>
      </div>
    </Dialog>
  );
};