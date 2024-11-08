import { useParams } from "react-router-dom";
import { useGetOneCharacter } from "../../hooks/useGetOneCharacter";
import { CircularProgress, Typography, Paper, Box, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HeightIcon from "@mui/icons-material/Height";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BrushIcon from "@mui/icons-material/Brush";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./style.scss";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addCharacter, removeCharacter } from "../../redux/slices/favourite.slice";
import { useAppSelector } from "../../hooks/useAppSelector";

const CharacterInfo = () => {
  const { id } = useParams();
  const { character, error, loading } = useGetOneCharacter(id!);
  const [characterName, setCharacterName] = useState<string>();
  const dispatch = useAppDispatch();
  const favoriteCharacters = useAppSelector((state) => state.favorites.characters);

  const isFavorite = (characterUrl: string) =>
    favoriteCharacters.some((character) => character.url === characterUrl);

  const handleEditName = () => {
    const newName = prompt("Enter new name:", characterName);
    if (newName) {
      setCharacterName(newName);
    }
  };

  const handleToggleLike = (character: any) => {
    if (isFavorite(character.name)) {
      dispatch(removeCharacter(character.name));
    } else {
      dispatch(addCharacter(character));
    }
  };

  useEffect(() => {
    setCharacterName(character?.name!);
  }, [character]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        Error: {error}
      </Typography>
    );
  }

  if (!character) {
    return <Typography align="center">Character not found</Typography>;
  }

  return (
    <Paper className="characther-info" style={{ padding: "20px", marginTop: "20px" }}>
      <div className="characther-info-name">
        <h2>{characterName}</h2>
        <EditIcon style={{ cursor: "pointer", marginLeft: "8px" }} onClick={handleEditName} />
        <IconButton
          edge="end"
          onClick={() => {handleToggleLike(character)}}
          color="error"
          style={{ marginLeft: "auto" }}
        >
          {isFavorite(character.url) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
      <Box mb={2}>
        <ul className="characther-info-details">
          <li className="characther-info-element">
            <AccountCircleIcon style={{ marginRight: "8px" }} />
            <strong>Gender:</strong> {character.gender}
          </li>
          <li className="characther-info-element">
            <HeightIcon style={{ marginRight: "8px" }} />
            <strong>Height:</strong> {character.height} cm
          </li>
          <li className="characther-info-element">
            <FitnessCenterIcon style={{ marginRight: "8px" }} />
            <strong>Mass:</strong> {character.mass} kg
          </li>
          <li className="characther-info-element">
            <BrushIcon style={{ marginRight: "8px" }} />
            <strong>Hair Color:</strong> {character.hair_color}
          </li>
          <li className="characther-info-element">
            <ColorLensIcon style={{ marginRight: "8px" }} />
            <strong>Skin Color:</strong> {character.skin_color}
          </li>
          <li className="characther-info-element">
            <RemoveRedEyeIcon style={{ marginRight: "8px" }} />
            <strong>Eye Color:</strong> {character.eye_color}
          </li>
          <li className="characther-info-element">
            <CalendarTodayIcon style={{ marginRight: "8px" }} />
            <strong>Birth Year:</strong> {character.birth_year}
          </li>
        </ul>
      </Box>
    </Paper>
  );
};

export default CharacterInfo;
