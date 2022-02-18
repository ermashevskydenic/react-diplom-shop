import { createStore, combineReducers } from "redux";
import cartUpdateReducer from "../reducers/cartUpdate";
import productsSearchReducer from "../reducers/productsSearch";


const reducer = combineReducers({
    cartUpdate: cartUpdateReducer,
    productsSearch: productsSearchReducer
});

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;