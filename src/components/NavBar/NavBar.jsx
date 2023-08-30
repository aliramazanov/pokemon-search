import { NavLink } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <nav>
      <NavLink className={"navlinks"} to={"/"}>
        Home
      </NavLink>
    </nav>
  );
}
