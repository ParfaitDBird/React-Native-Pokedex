import { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/PokemonApi';
import { PokemonPaginatedResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';

export const UsePokemonSearch = () => {

    const [isFetching, setIsFetching] = useState(true)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])

    const loadpokemon = async() =>{
        try {
            
        const respo = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');
        mapPokemonList( respo.data.results)
        } catch (e) {
            console.log('Failed to load an image but still showing results')
        }
    }

    const mapPokemonList = ( pokemonList: Result[]) => {

        const newPokemonList: SimplePokemon[]= pokemonList.map(({name, url})=>{
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2 ]
            const picture =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            return {id,picture,name}

        })

        setSimplePokemonList([...newPokemonList]);
        setIsFetching(false);
    }

    useEffect(() => {
        loadpokemon();
        }
    , [])

  return{
      isFetching,
    simplePokemonList,
  }


}
