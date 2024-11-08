import { Link } from "react-router-dom";
import "./style.scss"

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to={"/"} className="header-logo">
          <h5>Star</h5>
          <h5>wars</h5>
        </Link>

        <h4 className="header-title">May the force be with you!</h4>

        <Link className="header-favourite" to={"/favourites"}>
          My favourites
        </Link>
      </div>
    </header>
  );
};

export default Header;
