import { useState, useEffect } from 'react';
import { pokemonApi } from '../api/PokemonApi';
import { PokemonFull } from '../interfaces/pokemonInterfaces';

export const usePokemon = (id: string) => {

    const [isLoading, setIsLoading] = useState(true)
    const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull)


    const loadPokemon =async () => {
        const respo = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon(respo.data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemon()
    }, [])
    return{
        isLoading,
        pokemon,
    }
}
