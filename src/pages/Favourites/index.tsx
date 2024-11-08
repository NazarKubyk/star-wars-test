import FavouriteCard from "../../components/FavouriteCard";
import { useAppSelector } from "../../hooks/useAppSelector";
import "./style.scss";

const Favourites = () => {
  const favoriteCharacters = useAppSelector(
    (state) => state.favorites.characters
  );

  if (!favoriteCharacters.length) return <h1>You have no favourites</h1>;

  return (
    <div className="favourite-container">
      {favoriteCharacters.map((el) => (
        <FavouriteCard key={el.name} name={el.name} />
      ))}
    </div>
  );
};

export default Favourites;
