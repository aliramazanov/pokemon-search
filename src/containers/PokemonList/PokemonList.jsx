import { useEffect, useState } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetPokemonList } from "../../store/actions/dataActions";
import ReactPaginate from "react-paginate";
import "./PokemonList.scss";

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
      return <p>Loading...</p>;
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
      return <p>{pokemonList.errorMsg}</p>;
    }
    return <p>Unable to get data</p>;
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
            {isLoading && <p>Loading...</p>}
          </>
        )}
      </div>
    </div>
  );
}
