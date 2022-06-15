import { deleteFromCart, handleFrequency } from '../actions/Root'
import { useSelector, useDispatch } from 'react-redux'
const useDeleteItem = () => {
    const dispatch = useDispatch()
    const cartItem = useSelector(state => state.cart_state.cart);

    const deleteItem = (item_id) => {
        let itemToChange = cartItem?.find(_i=>_i.item.id ==item_id)
        if (itemToChange.frequency > 1) { dispatch(handleFrequency(item_id, 'delete')) } else { dispatch(deleteFromCart(item_id)); }
       
        // cartItem?.map(e => {
        //     if (e.item.id == item_id) {
        //         if (e.frequency > 1) {
        //             e.frequency -= 1;
        //             console.log(e.frequency)
        //         }
        //         else {
        //             dispatch(deleteFromCart(item_id));
        //         }
        //     }
        // })
    }
    return {deleteItem}

}

export default useDeleteItem