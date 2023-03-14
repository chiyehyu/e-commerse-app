import { FaMaxcdn } from 'react-icons/fa';
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    //set max price
    let priceArr = action.payload.map((p) => p.price);
    let priceMax = Math.max(...priceArr);

    return {
      ...state,
      filterProducts: action.payload,
      //allProducts: action.payload,
      allProducts: [...action.payload],
      filter: { ...state.filter, maxPrice: priceMax, price: priceMax },
    };
    return {
      ...state,
      filterProducts: [...action.payload],
      allProducts: [...action.payload],
      filter: { ...state.filter, maxPrice: priceMax, price: priceMax },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, gridView: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, gridView: false };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filterProducts } = state;
    let tmpProducts = [];
    if (sort === 'price-lowest') {
      tmpProducts = filterProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-highest') {
      tmpProducts = filterProducts.sort((a, b) => b.price - a.price);
    } else if (sort === 'name-a') {
      tmpProducts = filterProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sort === 'name-z') {
      tmpProducts = filterProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    } else {
      tmpProducts = [...filterProducts];
    }

    return { ...state, filterProducts: tmpProducts };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;

    return { ...state, filter: { ...state.filter, [name]: value } }; //using dynamic property by [name]
  }
  if (action.type === FILTER_PRODUCTS) {
    let tmpProducts = [...state.allProducts];
    //filtering allProducts
    const { text, category, company, color, price, shipping } = state.filter;
    if (text) {
      tmpProducts = tmpProducts.filter((p) =>
        p.name.toLowerCase().startsWith(text.toLowerCase())
      );
    }
    if (category !== 'all') {
      tmpProducts = tmpProducts.filter((p) => p.category === category);
    }
    if (company !== 'all') {
      tmpProducts = tmpProducts.filter((p) => p.company === company);
    }
    if (color !== 'all') {
      tmpProducts = tmpProducts.filter((p) => p.colors.includes(color));
    }
    tmpProducts = tmpProducts.filter((p) => p.price <= price);
    if (shipping) {
      tmpProducts = tmpProducts.filter((p) => p.shipping === true);
    }

    return { ...state, filterProducts: tmpProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filter: {
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        minPrice: 0,
        maxPrice: state.filter.maxPrice,
        price: state.filter.maxPrice,
        shipping: false,
      },
    };
  }
  //return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
