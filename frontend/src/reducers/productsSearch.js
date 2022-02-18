import { SEARCH_PRODUCTS } from '../actions/actionTypes'

const initialState = {
    data: [],
    text: ''
}

export default function productsSearchReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_PRODUCTS:
            const { text } = action.payload;
            return {
                ...state,
                text
            };

        default:
            return state;
    }


}