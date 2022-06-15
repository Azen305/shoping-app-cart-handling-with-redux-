export const addToCart = (single_item)=>{
    return{
        type: 'AddItemToCart',
        payload : single_item
    }
}
export const deleteFromCart = (single_item) => {
    return {
        type: 'DeleteItemFromCart',
        payload: single_item
    }
}

export const openModalAction = () => {
    return {
        type: 'ModalOpen',
        
    }
}

export const closeModalAction = () => {
    return {
        type: 'ModalClose',

    }
}
export const handleFrequency = (id, action_status) => {
    return {
        type: 'handleFreq',
        payload:id,
        action_status

    }
}