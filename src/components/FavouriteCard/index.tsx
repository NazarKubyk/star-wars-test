import { Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import "./style.scss";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { removeCharacter } from "../../redux/slices/favourite.slice";

type Props = {
  name: string;
};

const FavouriteCard = ({ name }: Props) => {
  const dispatch = useAppDispatch();

  const handleLikeRemove = (name: string) => {
    dispatch(removeCharacter(name));
  };

  return (
    <div className="favourite-card">
      <IconButton 
        onClick={() => {
          handleLikeRemove(name);
        }}
        className="favourite-card-icon"
        edge="end"
        color="error"
      >
        {<Favorite />}
      </IconButton>
      <h5 className="favourite-card-name">{name}</h5>
    </div>
  );
};

export default FavouriteCard;
