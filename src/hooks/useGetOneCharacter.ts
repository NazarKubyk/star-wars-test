import { useEffect, useState } from "react";
import { Character } from "../types";

export const useGetOneCharacter = (id: string) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://swapi.dev/api/people/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch character");
        }
        const data = await response.json();
        setCharacter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, []);

  return { character, loading, error };
};
