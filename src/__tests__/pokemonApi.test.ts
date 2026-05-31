import { describe, it, expect, vi, beforeEach } from 'vitest';
import fetchPokemons from '../api/pokemonApi';

describe('pokemonApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty array when searchTerm is empty', async () => {
    const result = await fetchPokemons('');
    expect(result).toEqual([]);
  });

  it('fetches and filters pokemons correctly', async () => {
    const mockResponse = {
      ok: true,
      json: async () => ({
        results: [
          { name: 'pikachu', url: 'url1' },
          { name: 'raichu', url: 'url2' },
          { name: 'bulbasaur', url: 'url3' },
        ],
      }),
    };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    const result = await fetchPokemons('pikachu');

    expect(result).toEqual([
      { name: 'pikachu', description: 'Pokemon - pikachu', url: 'url1' },
    ]);
  });

  it('handles 404 error', async () => {
    const mockResponse = { ok: false, status: 404 };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    await expect(fetchPokemons('pikachu')).rejects.toThrow(
      'Pokemon API not found. Please try again later.'
    );
  });

  it('handles 500 error', async () => {
    const mockResponse = { ok: false, status: 500 };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    await expect(fetchPokemons('pikachu')).rejects.toThrow(
      'Server error. Please try again later.'
    );
  });

  it('handles network error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Failed to fetch'))
    );

    await expect(fetchPokemons('pikachu')).rejects.toThrow(
      'Network error: Unable to reach Pokemon API. Please check your connection.'
    );
  });
});
