import { combineReducers } from "redux";
import dataActionsReducer from "./dataActionsReducer";
import multipleDataReducer from "./multipleDataReducer";

const RootReducer = combineReducers({
  PokemonList: dataActionsReducer,
  Pokemon: multipleDataReducer,
});

export default RootReducer;
