import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;

    const sameItem = state.cart.find((item) => item.id === id + color);
    //if same item can be found
    if (sameItem) {
      //add number on the same item
      const newCart = state.cart.map((item) => {
        if (item.id === id + color) {
          let newAmount =
            item.amount + amount > product.stock
              ? product.stock
              : item.amount + amount;
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });

      return { ...state, cart: newCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        stock: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tmpCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tmpCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tmpCart = state.cart.map((item) => {
      if (item.id === id) {
        let newAmount = item.amount + value;
        if (newAmount > item.stock) {
          newAmount = item.stock;
        }
        if (newAmount < 1) {
          newAmount = 1;
        }
        return { ...item, amount: newAmount };
      } else {
        return item;
      }
    });
    return { ...state, cart: tmpCart };
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (total, item) => {
        const { amount, price } = item;
        total.totalItems += amount;
        total.totalAmount += amount * price;
        return total;
      },
      { totalItems: 0, totalAmount: 0 }
    );
    return { ...state, totalItems, totalAmount };
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
