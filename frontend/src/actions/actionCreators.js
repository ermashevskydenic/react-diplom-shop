import {
  UPDATE_CART,
  SEARCH_PRODUCTS,
  ADD_SERVICE_REQUEST,
  ADD_SERVICE_FAILURE,
  ADD_SERVICE_SUCCESS,
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_FAILURE,
  FETCH_SERVICES_SUCCESS
} from './actionTypes';

export function updateCart(items) {
  return {type: UPDATE_CART, payload: {items}};
}

export function searchProducts(text) { // поиск
  return {type: SEARCH_PRODUCTS, payload: {text}};
}

export const addService = () => async (dispatch, getState) => {
  dispatch(addServiceRequest());
  const {serviceAdd: {order: {owner, items}}} = getState();

  try {
    const response = await fetch('http://localhost:7070/api/order', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:7070/api/order',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({owner, items}),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    window.localStorage.clear();
    dispatch(addServiceSuccess());
  } catch (e) {
    dispatch(addServiceFailure(e.message));
  }

  dispatch(fetchServices());
};

export const addServiceRequest = (order) => ({
  type: ADD_SERVICE_REQUEST,
  payload: {
    order
  },
})

export const addServiceFailure = message => ({
  type: ADD_SERVICE_FAILURE,
  payload: {
    message,
  },
});

export const addServiceSuccess = () => ({
  type: ADD_SERVICE_SUCCESS,
});

export const fetchServicesRequest = () => ({
  type: FETCH_SERVICES_REQUEST,
});

export const fetchServicesFailure = error => ({
  type: FETCH_SERVICES_FAILURE,
  payload: {
    error,
  },
});

export const fetchServicesSuccess = items => ({
  type: FETCH_SERVICES_SUCCESS,
  payload: {
    items,
  },
});

export const fetchServices = (url) => async (dispatch) => {
  dispatch(fetchServicesRequest());

  try {
    const response = await fetch(`${url}`);

    if(!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchServicesSuccess(data));

  } catch (error) {
    dispatch(fetchServicesFailure(error.message));
  }
};