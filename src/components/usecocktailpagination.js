import { useState } from 'react';

export const useCocktailPagination = () => {
    const [page, setPage] = useState(1);
    const [cocktails, setCocktails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    const fetchCocktails = async (newPage, query) => {
        let url = `/api/cocktails?page=${newPage}&limit=3`;

        if (query) {
          url = `/api/cocktails/search?query=${query}&page=${newPage}&limit=3`;
        }
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            setCocktails(data.cocktails);
            setTotalPages(data.totalPages);
          } catch (error) {
            console.error('error:', error);
          }
        };

    const handleNextPage = () => {
        if (page < totalPages) {
            const newPage = page + 1;
            setPage(newPage);
            fetchCocktails(newPage, searchTerm);
          }
        };

    const handlePrevPage = () => {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            fetchCocktails(newPage, searchTerm);
        }
        };
    
    const resetPage = () => {
        fetchCocktails(page);
    };

    const handleSearch = (query) => {
        setSearchTerm(query);
        setPage(1);
        fetchCocktails(1, query);
    };

    return { cocktails, page, handleNextPage, handlePrevPage, handleSearch, fetchCocktails, totalPages, resetPage };
};