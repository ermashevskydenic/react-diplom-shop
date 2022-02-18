import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

function Catalog() {

    const [categories, setCategories] = useState('');
    const [items, setItems] = useState('');
    const [index, setIndex] = useState(null)
    let [num, setNum] = useState(6)
    const { text } = useSelector(state => state.productsSearch)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_CATEGORIES_URL}`)
            .then(response => response.json())
            .then(response => setCategories(response))

        if (text) {
            fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?q=' + text}`)
                .then(response => response.json())
                .then(response => setItems(response))

        } else {
            fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL}`)
                .then(response => response.json())
                .then(response => setItems(response))
        }
    }, [text]);

    function handleSelectCategory(evt, id) {
        [...document.querySelectorAll('.justify-content-center > .nav-item > .nav-link')].map(o => o.classList.remove('active'))
        evt.target.classList.add('active')

        if (id) {

            if (text) {
                fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?categoryId=' + id + '&q=' + text}`)
                    .then(response => response.json())
                    .then(response => setItems(response))
            } else {
                fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?categoryId=' + id}`)
                    .then(response => response.json())
                    .then(response => setItems(response))
            }
            setIndex(id)

        } else {

            if (text) {
                fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?q=' + text}`)
                    .then(response => response.json())
                    .then(response => setItems(response))
            } else {
                fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL}`)
                    .then(response => response.json())
                    .then(response => setItems(response))
            }
            setIndex(null)
        }
        setNum(6)
    }

    function handleClickMore() {
        let sum = parseInt(num) + 6
        setNum(() => sum)
        if (index) {

            if (text) {
                fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?categoryId=' + index + '&q=' + text + '&offset=' + num}`)
                    .then(response => response.json())
                    .then(response => setItems(response))
            } else {
                fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?categoryId=' + index + '&offset=' + num}`)
                    .then(response => response.json())
                    .then(response => setItems(response))
            }
        } else {

            if (text) {
                fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?q=' + text + '&offset=' + num}`)
                    .then(response => response.json())
                    .then(response => setItems(response))
            } else {
                fetch(`${process.env.REACT_APP_DATA_CATEGORIES_URL + '?offset=' + num}`)
                    .then(response => response.json())
                    .then(response => setItems(response))
            }
        }

    }
    console.log(items);

    if (categories) {
        return (
            <Fragment>
                <ul className='catalog-categories nav justify-content-center'>
                    <li className='nav-item'>
                        <p className='nav-link active' onClick={(evt) => handleSelectCategory(evt, null)}>Все</p>
                    </li>
                    {categories.map(o => (
                        <li className='nav-item' key={o.id}>
                            <p className='nav-link' onClick={(evt) => handleSelectCategory(evt, o.id)}>{o.title}</p>
                        </li>
                    ))}
                </ul>
                {items &&
                    (<Fragment>
                        <div className='row'>
                            {items.map(o => (
                                <div className='col-4' key={o.id} >
                                    <div className='card catalog-item-card' >
                                        <img src={o.images[0]} className='card-img-top img-fluid' alt={o.title} style={{ width: '90%', height: 200, objectFit: 'cover' }} onError={({ target }) => { target.src = 'https://image.freepik.com/free-icon/_318-10072.jpg' }} />
                                        <div className='card-body'>
                                            <p className='card-text'>{o.title}</p>
                                            <p className='card-text'>{o.price} руб.</p>
                                            <NavLink to={'/catalog/' + o.id} exact className='btn btn-outline-primary' >
                                                Заказать
                                        </NavLink>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {items.length === 6 &&
                            <div className='text-center'>
                                <button className='btn btn-outline-primary' onClick={() => handleClickMore()}>Загрузить ещё</button>
                            </div>}
                    </Fragment>)
                }
            </Fragment>
        );
    } else { return null; }
}

export default Catalog;