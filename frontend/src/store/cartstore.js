import redux,{createStore} from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit'
const initialCartState = {
    CartCounter : 0,
}

const CartSlicer = createSlice({
    name : 'authentication',
    initialState : initialCartState,
    reducers : {
        CartAdder(state){
            state.CartCounter += 1
        }
    }
})

export const CartActions = CartSlicer.actions

export default CartSlicer.reducer;