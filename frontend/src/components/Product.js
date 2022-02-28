import React, { useState, useEffect, Fragment } from 'react';
import useFetch from '../hooks/useFetch'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux'//
import { updateCart } from '../actions/actionCreators';


function Product({ match }) {
    const url = process.env.REACT_APP_DATA_CATEGORIES_URL + '/' + match.params.id
    const [{ data, loading, error }] = useFetch(url) // загрузка данных с бэка
    const [order, setOrder] = useState({ count: 1, size: '' }) // товар
    const [form, setForm] = useState({})

    const dispatch = useDispatch()//

    useEffect(() => {
        if (data.id) {
            setForm({
                image: data.images[0],
                title: data.title,
                sku: data.sku,
                manufacturer: data.manufacturer,
                color: data.color,
                material: data.material,
                season: data.season,
                reason: data.reason,
                sizes: data.sizes,
                id: data.id,
                price: data.price
            })
        }
    }, [data])

    const handleSelected = (evt) => { // выделить выбранный размер
        const { textContent } = evt.target
        setOrder({
            ...order,
            size: textContent,
        })
    }

    const handleDecrement = () => { // уменьшить колво
        if (order.count > 1) {
            setOrder({
                ...order,
                count: order.count - 1
            })
        }
    }

    const handleIncrement = () => { // увеличить колво
        if (order.count < 10) {
            setOrder({
                ...order,
                count: order.count + 1
            })
        }
    }
    const addtoCart = () => {
        const items = JSON.parse(localStorage.getItem('items')) || [];

        let newOrder = { id: form.id, title: form.title, size: order.size, count: order.count, price: form.price };
        let found = items.findIndex(o => o.id === newOrder.id && o.size === newOrder.size);

        if (found === -1) {
            items.push(newOrder);
        } else {
            items[found].count += newOrder.count;
        }
        localStorage.setItem('items', JSON.stringify(items));
        console.log(localStorage.getItem('items'));
        dispatch(updateCart(items))
    }

    if (loading) {
        return (
            <p>Loading...</p>
        );
    }
    if (error) {
        console.log(error);
        return <p>Что-то пошло не так</p>;
    }

    return (
        <Fragment>
            {form.title !== undefined &&
                <section className="catalog-item container catalog">
                    <h2 className="text-center">{form.title}</h2>
                    <div className="row">
                        <div className="col-5">
                            <img src={form.image} className="img-fluid" alt={form.title}
                                onError={({ target }) => { target.src = 'https://image.freepik.com/free-icon/_318-10072.jpg' }} />
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Артикул</td>
                                        <td>{form.sku}</td>
                                    </tr>
                                    <tr>
                                        <td>Производитель</td>
                                        <td>{form.manufacturer}</td>
                                    </tr>
                                    <tr>
                                        <td>Цвет</td>
                                        <td>{form.color}</td>
                                    </tr>
                                    <tr>
                                        <td>Материалы</td>
                                        <td>{form.material}</td>
                                    </tr>
                                    <tr>
                                        <td>Сезон</td>
                                        <td>{form.season}</td>
                                    </tr>
                                    <tr>
                                        <td>Повод</td>
                                        <td>{form.reason}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <p>Размеры в наличии:
                                    {form.sizes !== undefined &&
                                        form.sizes.map((o, i) => o.avalible &&
                                            <span className={`catalog-item-size ${order.size === o.size ? 'selected' : ''} `} key={i} onClick={handleSelected}>
                                                {o.size}
                                            </span>)
                                    }
                                </p>
                                {form.sizes !== undefined &&
                                    <p>Количество:
                                        <span className="btn-group btn-group-sm pl-2">
                                            <button className="btn btn-secondary" onClick={handleDecrement}>-</button>
                                            <span className="btn btn-outline-primary">{order.count}</span>
                                            <button className="btn btn-secondary" onClick={handleIncrement}>+</button>
                                        </span>
                                    </p>
                                }
                            </div>
                            <NavLink to="/cart">
                                <button className='btn btn-danger btn-block btn-lg' disabled={order.size ? false : true} onClick={addtoCart}>В корзину</button>
                            </NavLink>
                        </div>
                    </div>
                </section>
            }
        </Fragment>
    )
}
export default Product;