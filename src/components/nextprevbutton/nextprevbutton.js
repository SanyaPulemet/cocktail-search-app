import { useEffect, useState } from 'react';

export const NextPrevButton = ({ onClick, isNext, page, totalPages }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(isNext ? page >= totalPages : page <= 1);
  }, [page, totalPages, isNext]);

  const buttonStyle = `flex items-center justify-center w-[100px] h-[40px] rounded-[20px] font-poppins font-semibold text-[14px] ${
    isDisabled ? 'bg-[#1D1D1D] text-[#6A6A6A]' : 'bg-[#232324] text-[#B0B0B0]'
  }`;

  return (
    <button 
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={buttonStyle}
    >
      {!isNext && (
        <img
          src='/next-prev.svg'
          alt='Prev Icon'
          className={'w-4 h-4 transform rotate-180 mr-2'}
        />
      )}
      {isNext ? 'NEXT' : 'PREV'}
      {isNext && (
        <img
          src='/next-prev.svg'
          alt='Next Icon'
          className={'w-4 h-4 ml-2'}
        />
      )}
    </button>
  );
};


