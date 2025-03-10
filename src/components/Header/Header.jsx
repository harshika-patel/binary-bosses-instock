import './Header.scss';
import { NavLink ,useLocation} from 'react-router-dom';
import logo from '../../assets/Logo/InStock-Logo.svg'
import { useState, useEffect } from 'react';

const Header=(props)=>{
    const [activeTab, setActiveTab] = useState("warehouse");
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/"|| location.pathname.startsWith("/warehouse")) {
            setActiveTab("warehouse");  // Make warehouse the default active tab
        } else if (location.pathname.startsWith("/inventory")) {
            setActiveTab("inventory");
        }
    }, [location]);
    return(
        <header className='header'>
            <div className='header__logo'>
                <img src={logo} alt="instock_logo" className='header__logo-img' />
               
            </div>
            <div className='header__nav'>
            <NavLink 
                    to="/" 
                    className={`header__btn ${activeTab === "warehouse" ? "active" : ""}`} 
                    onClick={() => setActiveTab("warehouse")}
                >
                    <h3 className='header__nav-title'>Warehouses</h3>
                </NavLink>
                <NavLink 
                    to="/inventory" 
                    className={`header__btn ${activeTab === "inventory" ? "active" : ""}`} 
                    onClick={() => setActiveTab("inventory")}
                >
                    <h3 className='header__nav-title'>Inventory</h3>
                </NavLink> 
            </div>
        </header>
    )
}
export default Header; 
