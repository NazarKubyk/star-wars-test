import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import { useGetAllCharacters } from "../../hooks/useGetAllCharacters";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  addCharacter,
  removeCharacter,
} from "../../redux/slices/favourite.slice";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";
import { Character } from "../../types";

const CharacterList = () => {

  const { characters, loading, error } = useGetAllCharacters();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedCharacters, setSortedCharacters] = useState(characters);

  const dispatch = useAppDispatch();
  const favoriteCharacters = useAppSelector(
    (state) => state.favorites.characters
  );

  const isFavorite = (characterUrl: string) =>
    favoriteCharacters.some((character: Character) => character.url === characterUrl);

  const handleToggleLike = (character: any) => {
    if (isFavorite(character.name)) {
      dispatch(removeCharacter(character.name));
    } else {
      dispatch(addCharacter(character));
    }
  };

  useEffect(() => {
    setSortedCharacters(characters)
  }, [characters])


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    
    const filteredCharacters = characters!.filter((character) =>
      character.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSortedCharacters(filteredCharacters);
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
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

  return (
    <Paper style={{ margin: "20px 0", padding: "10px", width: "100%" }}>
      <Typography variant="h5" align="center" fontWeight={"700"} gutterBottom>
        Characters List
      </Typography>
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px" }}
      />
      <List>
        {sortedCharacters?.map((character, index) => (
          <ListItem
            key={index}
            divider
            secondaryAction={
              <IconButton
                edge="end"
                onClick={() => handleToggleLike(character)}
                color="error"
              >
                {isFavorite(character.url) ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            }
          >
            <Link
              //! Need an ID for character. For now id is taken from url string of character
              to={`/character/${character.url.split('/').filter(Boolean).pop()}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <ListItemText primary={character.name} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CharacterList;
