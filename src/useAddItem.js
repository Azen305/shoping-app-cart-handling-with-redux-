
import { addToCart, handleFrequency } from './actions/Root'
import {useSelector, useDispatch}from 'react-redux'
const useAddItem = () => {
    const dispatch = useDispatch()
    const cartItem = useSelector(state => state.cart_state.cart);
    const checkDuplicacy = (cart, item) => {

        return cart?.length > 0 && cart?.some(_item => _item.item.id == item.id)
    }
    const addSameIteamAgain=(a)=>{
        dispatch(handleFrequency(a, 'add'))
        // cartItem?.map(e=>{
        //     if(e.item.id==a)
        //     {
        //         e.frequency+=1;
        //         console.log(e.frequency)
        //     }
        // })
    }
    
    const addCart = (item) => {
        checkDuplicacy(cartItem, item) ? window.confirm("Already in cart, do you still want to add in cart ?") && addSameIteamAgain(item.id) :  dispatch(addToCart({item , frequency : 1}));
    }
    return { addCart }
}

export default useAddItem