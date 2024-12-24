import { useState, useEffect } from 'react';

export const IngredientInputAddModal = ({ isEditing, ingredients, cocktailId }) => {
  const [ingredientsList, setIngredientsList] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(isEditing ? ingredients : [],);

  useEffect(() => { // прости Господи
    async function fetchIngredients() {
      const response = await fetch('/api/cocktails/ingredient');
      const data = await response.json();
      setIngredientsList(data);
    }
    fetchIngredients();
  }, []);

  const addIngredient = () => {
    setSelectedIngredients([
        ...selectedIngredients,
        { ingredientId: '', amountOz: '' },
      ]);
  };

  const removeIngredient = (index) => {
    const newSelected = selectedIngredients.filter((_, i) => i !== index);
    setSelectedIngredients(newSelected);
  };

  const deleteIngredientFromCocktail = async (ingredientId) => {
    try {
      await fetch(
        `/api/cocktails/ingredient?cocktailId=${cocktailId}&ingredientId=${ingredientId}`,
        {
          method: 'DELETE',
        },
      );
      removeIngredientById(ingredientId);
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  const removeIngredientById = (ingredientId) => {
    setSelectedIngredients(
      selectedIngredients.filter((i) => i.ingredientId !== ingredientId),
    );
  };

  const handleSelectChange = (index, field, value) => {
    const newSelected = [...selectedIngredients];
    newSelected[index][field] = parseInt(value);
    setSelectedIngredients(newSelected);
  };

  const newIngredients = selectedIngredients.filter((ing) => !ing.ingredient);

  return (
    <div className='mt-[27px] bg-[#141414] min-h-[313px] rounded-lg pt-[20px] pl-[20px] font-poppins font-medium text-[30px] max-w-[426px]'>
      INGREDIENTS
      <div className='mt-[13px] ml-[20px]'>
        {selectedIngredients.map((ing, index) => (
          <div key={index} className='flex'>
            <button
              type='button'
              onClick={() =>
                isEditing
                  ? deleteIngredientFromCocktail(ing.ingredientId)
                  : removeIngredient(index)
              }
            >
              <img
                src='/exit.svg'
                alt='exit'
                className="w-[24px] h-[24px] mr-[10px]"
              />
            </button>
            {isEditing && ing.ingredient?.name ? (
              `${ing.ingredient.name} - ${ing.amountOz} OZ`
            ) : (
              <div className='flex'>
                <select
                  onChange={(e) =>
                    handleSelectChange(index, 'ingredientId', e.target.value)
                  }
                  value={ing.ingredientId}
                  className='font-poppins font-extralight text-[24px] mr-[5px] border-b-[2px] border-[#B0B0B0] bg-transparent focus:outline-none max-w-[213px]'
                  required
                >
                  <option value=''>Select</option>
                  {ingredientsList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <input
                  type='number'
                  step='1'
                  onChange={(e) =>
                    handleSelectChange(index, 'amountOz', e.target.value)
                  }
                  value={ing.amountOz}
                  className='font-poppins font-extralight text-[24px] mr-[5px] border-b-[2px] border-[#B0B0B0] bg-transparent focus:outline-none max-w-[72px]'
                  required
                />
                OZ
              </div>
            )}
          </div>
        ))}
        <button type='button' onClick={addIngredient}>
          + ADD
        </button>
      </div>

      <input
        type='hidden'
        name='ingredients'
        value={JSON.stringify(newIngredients)}
      />
    </div>
  );
};