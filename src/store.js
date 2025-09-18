import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice'; // imports your cart slice

const store = configureStore({
    reducer: {
        cart: cartReducer, // maps the cart slice in Redux state
    },
});

export default store; // export to use with <Provider>
