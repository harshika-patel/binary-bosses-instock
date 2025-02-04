import logo from "../../assets/Logo/inStock-Logo_1x.png";
const Header = (props) => {
    return (
        <header className="header">
            <div className="header__logo">
                <img src={logo} alt="instock_logo" className="header__logo-img" />
                <h1 className="header__logo-title">INSTOCK</h1>
            </div>
            <div className="header__nav">
                <h3 className="header__nav-warehouse">Warehouses</h3>
                <h3 className="header__nav-warehouse">Inventory</h3>
            </div>
        </header>
    );
};
export default Header;
