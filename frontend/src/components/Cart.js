import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { updateCart } from '../actions/actionCreators'

function Cart() {
    const [arr, setLocalArr] = useState([])
    const [inputData, setInputData] = useState({
        phone: '',
        address: '',
        agreement: false
    })
    const {loading, error, success} = useState(state => state.ServiceAdd);
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("items"))
        console.log(items);
        setLocalArr(items);
        if (items && items.length > 0) {
            setDisabled(false)
        }
    }, [])

    const handleDelete = (el) => { // очистка корзины
        const items = JSON.parse(localStorage.getItem("items"))
        let found = items.findIndex(o => o.id === el.id)
        items.splice(found, 1)
        console.log(items);

        localStorage.setItem("items", JSON.stringify(items))
        setLocalArr(items)

        console.log(items);
        dispatch(updateCart(items))
    }

    const handleFillForm = ({ target }) => { // форма оформления заказа
        const { id, checked } = target
        const value = target.type === 'checkbox' ? checked : target.value;
        setInputData(prev => ({ ...prev, [id]: value }))
    }

    const handleSendData = (evt) => { // оформить заказ
        evt.preventDefault()

        const items = arr.map(el => {
            return {
                "id": el.id,
                "price": el.price,
                "count": el.count
            }
        })

        const owner = {
            "phone": inputData.phone,
            "address": inputData.address,
        }

        const order = Object.assign({}, { 'owner': owner }, { 'items': items })
        console.log(order)
        const response = fetch(`${proccess.env.REACT_APP_ORDER_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        if (!response.ok) {
            console.log(response.statusText)
        }
        setLocalArr([])
        setInputData({
            phone: '',
            address: '',
            agreement: false
        })
        setDisabled(true)
        localStorage.clear()
        dispatch(updateCart(0))
    }

    return (
        <Fragment>
            <section className="cart container">
                <h2 className="text-center">Корзина</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Размер</th>
                            <th scope="col">Кол-во</th>
                            <th scope="col">Стоимость</th>
                            <th scope="col">Итого</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr &&
                            (<Fragment>
                                {arr.map((el, id) => {
                                    return (
                                        <tr key={id}>
                                            <th scope="row">{id + 1}</th>
                                            <td><NavLink to={'/catalog/' + el.id}>{el.title}</NavLink></td>
                                            <td>{el.size}</td>
                                            <td>{el.count}</td>
                                            <td>{el.price} руб.</td>
                                            <td>{el.price * el.count} руб.</td>
                                            <td>
                                                <button className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleDelete(el)}>Удалить
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                                )}
                                <tr>
                                    <td colSpan="5" className="text-right">Общая стоимость</td>
                                    <td>{arr.reduce((acc, el) => acc + (el.price * el.count), 0)} руб.</td>
                                </tr>
                            </Fragment>)
                        }
                    </tbody>
                </table>
            </section>
            <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                {(error && <p className='error'>Произошла ошибка!</p>) ||
                    (loading && <div className='preloader'><span></span><span></span><span></span><span></span></div>) ||
                    (success && <p className='success'>Заказ оформлен</p>) ||
                <div className="card" style={{ maxWidth: '30rem', margin: 'auto' }}>
                    <form className="card-body">
                        <div className="form-group">
                            <label htmlFor="phone">Телефон</label>
                            <input className="form-control" id="phone" placeholder="Ваш телефон" onChange={handleFillForm} value={inputData.phone} disabled={disabled} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Адрес доставки</label>
                            <input className="form-control" id="address" placeholder="Адрес доставки" onChange={handleFillForm} value={inputData.address} disabled={disabled} />
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="agreement" onChange={handleFillForm} checked={inputData.agreement} disabled={disabled} />
                            <label className="form-check-label" htmlFor="agreement" >Согласен с правилами доставки</label>
                        </div>
                        <button type="submit" className="btn btn-outline-secondary" onClick={handleSendData}
                            disabled={!(inputData.phone.length > 0 && inputData.address.length > 0 && inputData.agreement)}>
                            Оформить
                        </button>
                    </form>
                </div>}
            </section>
        </Fragment>
    )
}
export default Cart;