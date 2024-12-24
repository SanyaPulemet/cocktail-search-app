export const CocktailCard = ({ cocktail, onClick }) => (
  <div
    key={cocktail.id}
    className="bg-[#232324] rounded-lg max-w-full mh-[270px] mb-[34px] flex"
    onClick={onClick}
  >
    <img
      src={`/uploads/${cocktail.image}`}
      alt={cocktail.name}
      className="w-[213px] h-[228px] object-cover m-[21px_48px_21px_45px] rounded-lg"
    />
    <div className="flex flex-col justify-start mt-5">
      <div className="text-[#B0B0B0] font-poppins font-medium text-2xl mb-[28px]">{cocktail.name}</div>
      <div className="text-[#B0B0B0] font-poppins font-light text-2xl mb-[28px]">{cocktail.description}</div>
    </div>
  </div>
);