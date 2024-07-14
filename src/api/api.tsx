interface ApiCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: ApiCharacter[];
}

interface Character {
  name: string;
  status: string;
  species: string;
  image: string;
}

export const fetchCharacters = (
  name: string = "",
  page: number = 1,
): Promise<{ results: Card[]; totalPages: number }> => {
  const url = name
    ? `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`
    : `https://rickandmortyapi.com/api/character/?page=${page}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          return { results: [], totalPages: 1 };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data: ApiResponse) => {
      const results = data.results.map((character: ApiCharacter) => ({
        id: character.id, // Ensure 'id' is included here
        name: character.name,
        status: character.status,
        species: character.species,
        image: character.image,
      }));
      return { results, totalPages: data.info.pages };
    })
    .catch(() => ({ results: [], totalPages: 1 }));
};

export interface Card extends Character {
  id: number; // Assuming ID is a number based on ApiCharacter
  origin?: string; // Optional more simple origin from ApiCharacter's origin.name
  location?: string; // Optional more simple location from ApiCharacter's location.name
  gender?: string; // Optional
}

export const fetchCardDetails = (id: number): Promise<Card> => {
  return fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((character: ApiCharacter) => ({
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      image: character.image,
      origin: character.origin.name,
      location: character.location.name,
      gender: character.gender,
    }))
    .catch((error) => {
      console.error("Failed to fetch character details:", error);
      throw error;
    });
};
