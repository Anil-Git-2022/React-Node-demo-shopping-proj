import redux,{createStore} from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit'
var pid = ''
const initialAuthState = {
    isAuthenticatedState : localStorage.getItem("authenticated"),
    Uid : localStorage.getItem("uid"),
    CartCounter : localStorage.getItem('cartval') !== null ? localStorage.getItem('cartval'):0, 
}

const AuthenticateSlice = createSlice({
    name : 'authentication',
    initialState : initialAuthState,
    reducers : {
        login(state){
            state.isAuthenticatedState = true
        },
        logout(state){
            state.isAuthenticatedState = false
        },
        CartAdder(state,action){
            state.CartCounter = action.payload.cartval
            localStorage.setItem("cartval" ,action.payload.cartval)
        }
    }
})
export const AuthActions = AuthenticateSlice.actions

export default AuthenticateSlice.reducer;