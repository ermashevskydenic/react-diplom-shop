import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/header-logo.png';
import banner from '../img/banner.jpg';
import useReactRouter from 'use-react-router'
import { useSelector, useDispatch } from 'react-redux'
import { searchProducts } from '../actions/actionCreators'

function Header() {
    const { history } = useReactRouter()
    const dispatch = useDispatch()

    const { count } = useSelector(state => state.cartUpdate)

    const handleClickSearch = () => { // строка поиска
        const searchFormEl = document.querySelector('[data-id=search-form]')
        searchFormEl.classList.toggle('invisible')
        searchFormEl.querySelector('input').focus()
        if (searchFormEl.querySelector('.form-control').value !== "") {
            history.push('catalog')
            searchFormEl.querySelector('.form-control').value = ""
        }
    }

    const handleChangeTextSearch = ({ target }) => { // отправка поискового запроса
        if (target.value) {
            dispatch(searchProducts(target.value))
        }
    }

    return (
        <Fragment>
            <header className='container'>
                <div className='row'>
                    <div className='col'>
                        <nav className='navbar navbar-expand-sm navbar-light bg-light'>
                            <NavLink to='/' exact className='navbar-brand'>
                                <img src={logo} alt='Bosa Noga' />
                            </NavLink>
                            <div className='collapase navbar-collapse' id='navbarMain'>
                                <ul className='navbar-nav mr-auto'>
                                    <li className='nav-item active'>
                                        <NavLink to='/' exact className='nav-link'>Главная</NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to='/catalog' exact className='nav-link'>Каталог</NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to='/about' exact className='nav-link'>О магазине</NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to='/contacts' exact className='nav-link'>Контакты</NavLink>
                                    </li>
                                </ul>
                                <div>
                                    <div className='header-controls-pics'>
                                        <div data-id='search-expander' className='header-controls-pic header-controls-search' onClick={handleClickSearch}></div>
                                        <NavLink to="/cart" className='header-controls-pic header-controls-cart' onClick={null}>
                                            {count !== 0 &&
                                                <div className='header-controls-cart-full'>{count}</div>}
                                            <div className='header-controls-cart-menu'></div>
                                        </NavLink>
                                        <form data-id='search-form' className='header-controls-search-form form-inline invisible' onChange={handleChangeTextSearch}>
                                            <input className='form-control' placeholder='Поиск' />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='banner'>
                            <img src={banner} className='img-fluid' alt='К весне готовы!' />
                            <h2 className='banner-header'>К весне готовы!</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Header;