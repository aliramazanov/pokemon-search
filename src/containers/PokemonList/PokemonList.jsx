import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetPokemonList } from "../../store/actions/dataActions";
import "./PokemonList.scss";

export default function PokemonList() {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);

  useEffect(() => {
    FetchData(1);
  }, []);

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page));
  };
  const showData = () => {
    if (pokemonList.loading) {
      return <p>Loading...</p>;
    }
    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className={"list-wrapper"}>
          {pokemonList.data.map((el) => {
            return (
              <div key={el.name} className={"pokemon-item"}>
                <p className="message">{el.name}</p>
              </div>
            );
          })}
        </div>
      );
    }

    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>;
    }

    return <p>unable to get data</p>;
  };

  return <div>{showData()}</div>;
}
