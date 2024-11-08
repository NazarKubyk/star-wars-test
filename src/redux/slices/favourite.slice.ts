import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../types";

interface FavoritesState {
  characters: Character[];
}

const initialState: FavoritesState = {
  characters: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<Character>) => {
      const exists = state.characters.some(
        (character) => character.name === action.payload.url
      );
      if (!exists) {
        state.characters.push(action.payload);
      }
    },
    removeCharacter: (state, action: PayloadAction<string>) => {
      state.characters = state.characters.filter(
        (character) => character.name !== action.payload
      );
    },
  },
});

export const { addCharacter, removeCharacter } = favoritesSlice.actions;
export default favoritesSlice.reducer;
