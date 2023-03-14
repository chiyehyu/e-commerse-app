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
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
