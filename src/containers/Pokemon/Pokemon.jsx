import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetPokemon } from "../../store/actions/dataActions";
import _ from "lodash";
import "./Pokemon.scss";

export default function Pokemon() {
  const { pokemon: pokemonName } = useParams();
  const dispatch = useDispatch();
  const pokemonState = useSelector((state) => state.Pokemon);

  useEffect(() => {
    dispatch(GetPokemon(pokemonName));
  }, [dispatch, pokemonName]);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const showData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      const spriteImages = [
        pokeData.sprites.front_default,
        pokeData.sprites.back_default,
        pokeData.sprites.front_shiny,
        pokeData.sprites.back_shiny,
      ];

      return (
        <div className={"pokemon-wrapper"}>
          <div className="item">
            <h1>Sprites</h1>
            <div className="floating-images">
              {spriteImages.map((src, index) => (
                <div key={index} className="floating-image">
                  <img src={src} alt="" className="pokemon-image" />
                </div>
              ))}
            </div>
          </div>
          <div className="item">
            <h1>Stats</h1>
            {pokeData.stats.map((el) => (
              <p key={el.stat.name}>
                {capitalizeFirstLetter(el.stat.name)}: {el.base_stat}
              </p>
            ))}
          </div>
          <div className="item">
            <h1>Abilities</h1>
            {pokeData.abilities.map((el) => (
              <p key={el.ability.name}>
                {capitalizeFirstLetter(el.ability.name)}
              </p>
            ))}
          </div>
        </div>
      );
    }

    if (pokemonState.loading) {
      return <p>Loading...</p>;
    }

    if (pokemonState.errorMsg !== "") {
      return <p>{capitalizeFirstLetter(pokemonState.errorMsg)}</p>;
    }

    return <p>Error getting pokemon</p>;
  };

  return (
    <div className={"poke"}>
      <h1 className="pokemon-name">{capitalizeFirstLetter(pokemonName)}</h1>
      {showData()}
    </div>
  );
}
