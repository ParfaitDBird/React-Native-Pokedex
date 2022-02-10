import { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/PokemonApi';
import { PokemonPaginatedResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';

export const UsePokemonPaginated = () => {

    const [isLoading, setisLoading] = useState(true)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
    const nextPageurl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

    const loadpokemon = async() =>{
        setisLoading(true);
        const respo = await pokemonApi.get<PokemonPaginatedResponse>(nextPageurl.current);
        nextPageurl.current = respo.data.next;
        mapPokemonList( respo.data.results)
    }

    const mapPokemonList = ( pokemonList: Result[]) => {

        const newPokemonList: SimplePokemon[]= pokemonList.map(({name, url})=>{
            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2 ]
            const picture =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            return {id,picture,name}

        })

        setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
        setisLoading(false);
    }

    useEffect(() => {
        loadpokemon();
        }
    , [])

  return{
      isLoading,
    simplePokemonList,
    loadpokemon
  }


}
