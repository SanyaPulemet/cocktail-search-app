export const SearchBar = ({ handleSearch, cocktails }) => {
  return (
    <div className='relative w-4/5 mb-[34px] ml-[19px]'>
      <img
        src='/search-icon.svg'
        alt='Search Icon'
        className='absolute left-0 top-1/2 transform -translate-y-1/2 w-[44px] h-[44px]'
      />
      <input
        type='text'
        placeholder='SEARCH BAR'
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
        className='w-full pl-14 h-[60px] border-b-2 border-[#B0B0B0] bg-transparent text-[#B0B0B0] font-poppins font-medium text-[20px] focus:outline-none'
      />
    </div>
  );
};