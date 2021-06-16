import { ADD_TO_CART, CREATE_ORDER_SUCCESS, SET_ADDRESS_ID, SET_CREATE_ORDER_ERROR, SET_CREATE_ORDER_LOADER, SET_INSTRUCTION, SET_SELECTED_ADDRESS, SUB_TO_CART } from "../Types/CartActionTypes"

const initalState = {
    restroDetails: null,
    products: [],
    instruction: '',
    addressId: null,
    selectedAddress: 0,
    isLoading: false,
    error: '',
}

export default function Cart(state = initalState, {type, payload}) {
    switch(type) {
        case ADD_TO_CART:

            let {restroDetails, product} = payload
            let  pro = state.products.find(i => i?._id === product?._id)
            let data = null
            
            if (pro) {
                let productIndex = state.products.indexOf(pro)
                let newPro = [...state.products]
                newPro[productIndex] = {...product, qty: pro?.qty + 1}
                data = {...state, restroDetails, products: newPro}
            }
            else {
                data = {...state, restroDetails, products: [...state.products, {...product, qty: 1}]}
            }
            

            return data

        case SUB_TO_CART:
            let prod = payload
            let  prof = state.products.find(i => i?._id === prod?._id)
            let indexPro = state.products.indexOf(prof)
            let newP = null
            if(prof?.qty > 1) {
                 newP = [...state.products]
                newP[indexPro] = {...prof, qty: prof?.qty - 1}
            }
            else {
                 newP = [...state.products]
                newP.splice(indexPro, 1)
            }
            return {...state, products: newP, restroDetails: newP?.length ? state.restroDetails: null}
 
        case SET_INSTRUCTION:
            return {...state, instruction: payload}

        case SET_ADDRESS_ID: 
            return {...state, addressId: payload}

        case SET_SELECTED_ADDRESS:
            return {...state, selectedAddress: payload}
        
        case SET_CREATE_ORDER_LOADER:
            return {...state, isLoading: payload}
        
        case SET_CREATE_ORDER_ERROR:
            return {...state, error: payload}

        case CREATE_ORDER_SUCCESS: 
            return {...state, restroDetails: null, products: [], instruction: ''}
        default:
            return state
    }
}