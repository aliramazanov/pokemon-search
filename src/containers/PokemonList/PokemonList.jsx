import { useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetPokemonList } from "../../store/actions/dataActions";
import ReactPaginate from "react-paginate";
import "./PokemonList.scss";
import { CircularProgress } from "@mui/material";

export default function PokemonList() {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.PokemonList);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    const initialPage = storedPage ? parseInt(storedPage) : 1;
    setCurrentPage(initialPage);
    FetchData(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const FetchData = async (page = 1) => {
    setIsLoading(true);
    dispatch(GetPokemonList(page));
    setIsLoading(false);
    setCurrentPage(page);
    localStorage.setItem("currentPage", page);
  };

  const showData = () => {
    if (isLoading) {
      return (
        <p className="loading">
          {" "}
          <CircularProgress color="inherit" />
        </p>
      );
    }

    if (!_.isEmpty(pokemonList.data)) {
      return (
        <div className={"list-wrapper"}>
          {pokemonList.data.map((el) => (
            <div key={el.name} className={"pokemon-item"}>
              <p className="message">
                {el.name.charAt(0).toUpperCase() +
                  el.name.slice(1).toLowerCase()}
              </p>
              <Link className="view-pokemon" to={`/pokemon/${el.name}`}>
                View
              </Link>
            </div>
          ))}
        </div>
      );
    }

    if (pokemonList.errorMsg !== "") {
      <div className="errorforfetch">
        <p className="errorfetchtext">{pokemonList.errorMsg}</p>
      </div>;
    }
    return (
      <div className="errorforfetch">
        <p className="errorfetchtext">Couldn`&apos;`t get your Pokemons</p>
      </div>
    );
  };

  return (
    <div>
      {showData()}
      <div className="pagination-wrap">
        {!_.isEmpty(pokemonList.data) && (
          <>
            <ReactPaginate
              pageCount={Math.ceil(pokemonList.count / 15)}
              pageRangeDisplayed={3}
              marginPagesDisplayed={3}
              onPageChange={(data) => FetchData(data.selected + 1)}
              containerClassName={"pagination"}
              activeClassName={"active"}
              forcePage={currentPage - 1}
              initialPage={parseInt(localStorage.getItem("currentPage")) - 1}
            />
            {isLoading && <CircularProgress />}
          </>
        )}
      </div>
    </div>
  );
}
