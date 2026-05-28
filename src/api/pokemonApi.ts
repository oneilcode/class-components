const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

export default async function fetchPokemons(searchTerm: string) {
  if (!searchTerm) return [];

  try {
    const response = await fetch(POKEMON_URL);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Pokemon API not found. Please try again later.');
      }

      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment.');
      }

      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }

      throw new Error(`Error ${response.status}: Unable to load pokemons.`);
    }

    const data = await response.json();

    const filteredResults = data.results.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredResults.map((item: { name: string; url: string }) => ({
      name: item.name,
      description: `Pokemon - ${item.name}`,
      url: item.url,
    }));
  } catch {
    throw new Error('Unknown error occurred. Please try again.');
  }
}
