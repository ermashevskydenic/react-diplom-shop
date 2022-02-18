import { UPDATE_CART, SEARCH_PRODUCTS } from './actionTypes';

export function updateCart(items) {
  return {type: UPDATE_CART, payload: {items}};
}

export function searchProducts(text) { // поиск
  return {type: SEARCH_PRODUCTS, payload: {text}};
}