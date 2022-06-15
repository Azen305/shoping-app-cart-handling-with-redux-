const initialState={
    cart: [],
    isCartOpen: false
}
const newArr = (arr1, id,action_status)=> {
    
    const itemToChange = arr1.find(_i=>_i.item.id ==id)
    console.log("ITEM TO CHANGE", itemToChange)
    if (action_status == 'add') { itemToChange.frequency += 1; } else { itemToChange.frequency -= 1; }
  
    
    return arr1
};
const cartHandler = (state = initialState,action)=>{
    const { type,payload}=action;
    switch(type){
        case 'AddItemToCart':return {...state, cart : [...state.cart, payload]};
        case 'DeleteItemFromCart': return { ...state, cart: [...state.cart.filter((i)=>i.item.id!=payload)] };
        case 'ModalOpen': return { ...state, isCartOpen : true }
        case 'ModalClose': return { ...state, isCartOpen: false }
        case 'handleFreq': return {...state, cart : [...newArr(state.cart, payload, action.action_status)]}
        default: return state;
    }
}

export default cartHandler;