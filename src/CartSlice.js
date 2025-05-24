import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload);
        },
        updateQuantity: (state, action) => {
            const itemToUpdate = state.items.find(item => item.name === action.payload.name);
            if (itemToUpdate) {
                itemToUpdate.quantity = action.payload.quantity;
            }
        }
    }
});

export const selectTotalQuantity = (state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;