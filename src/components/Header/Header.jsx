import './Header.scss';
import logo from '../../assets/Logo/InStock-Logo.svg'
const Header=(props)=>{
    return(
        <header className='header'>
            <div className='header__logo'>
                <img src={logo} alt="instock_logo" className='header__logo-img' />
               
            </div>
            <div className='header__nav'>
            <button className='header__btn'> <h3 className='header__nav-title'>Warehouses</h3></button> 
              <button  className='header__btn'><h3 className='header__nav-title'>Inventory</h3></button> 
            </div>
        </header>
    )
}
export default Header; 
