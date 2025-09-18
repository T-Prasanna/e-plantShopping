import { createSlice } from '@reduxjs/toolkit';

// ✅ Load cart from localStorage if available
const persistedItems = JSON.parse(localStorage.getItem('cart')) || [];
const initialState = { items: persistedItems };

export const CartSlice = createSlice({
  name: 'cart',
  initialState, // <-- use persisted state here
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      // ✅ Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter(item => item.name !== name);

      // ✅ Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const item = state.items.find(item => item.name === name);

      if (item) {
        item.quantity = amount > 0 ? amount : 1;
      }

      // ✅ Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
