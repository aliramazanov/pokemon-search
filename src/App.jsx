import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import PokemonList from "./containers/PokemonList/PokemonList.jsx";
import Pokemon from "./containers/Pokemon/Pokemon.jsx";

function App() {
  return (
    <div className="app">
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path={"/"} element={<PokemonList />} />
        <Route path={"/pokemon/:pokemon"} element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;
