import { combineReducers } from "redux";
import dataActionsReducer from "./dataActionsReducer";

const RootReducer = combineReducers({
  PokemonList: dataActionsReducer,
});

export default RootReducer;
