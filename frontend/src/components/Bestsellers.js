import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Bestsellers() {

    const [items, setItems] = useState('');
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BESTSALES_URL}`)
            .then(response => response.json())
            .then(response => setItems(response)
            )
    }, []);

    if (items) {
        return (
            <Fragment>
                <section className='top-sales'>
                    <h2 className='text-center'>Хиты продаж!</h2>
                    <div className="row">
                        {items.map(o => (
                            <div className="col-4" key={o.id}> {/* загрузка страницы */}
                                <div className="card">
                                    <img src={o.images[0]} className="card-img-top img-fluid" alt={o.title} />
                                    <div className="card-body">
                                        <p className="card-text">{o.title.split(' ', 2).join(' ')}</p>
                                        <p className="card-text">{o.price} руб.</p>
                                        <NavLink to={'/catalog/' + o.id} exact className='btn btn-outline-primary' >
                                            Заказать
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </Fragment>
        );
    } else { return null; }
}
export default Bestsellers;