import "./Header.scss";
import { Link } from "react-router-dom";
// import siteLogo from "../../assets/logo/Instock-Logo";

function Header(){
    return(
        <header className="header">
           <Link to={`/warehouses`}> <div className="header__site-logo"></div></Link>
            <div className="header__button-container">
            <Link to={`/warehouses`}>
            <button className="header__warehouse"><h3>Warehouses</h3></button>
            </Link>
            <Link to={`/inventory`}>
            <button className="header__inventory"><h3>Inventory</h3></button>
            </Link>
            </div>
        </header>
    );
}

export default Header;