'use client';

import { useEffect, useState } from 'react';

function CocktailList() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await fetch('/api/getallcocktails');
        if (!response.ok) throw new Error('error');

        const data = await response.json();
        setCocktails(data);
      } catch (error) {
        console.error('error getting data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCocktails();
  }, []);

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <h1>cocktails</h1>
          <ul>
            {cocktails.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default CocktailList;