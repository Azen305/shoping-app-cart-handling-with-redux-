import React from 'react';
// import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Content from './components/Content';
import Header from './components/Header';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Table } from 'react-bootstrap';
import { closeModalAction } from './actions/Root';
import useDeleteItem from './customHooks/useDeleteItem';
import useAddItem from './useAddItem';
const App = () => {
    const isModalOpen = useSelector(state => state.cart_state.isCartOpen);
    const cartItem = useSelector(state => state.cart_state.cart);
    const dispatch = useDispatch();
    const { deleteItem } = useDeleteItem();
    const { addCart } = useAddItem();


    const closeModal = () => {
        dispatch(closeModalAction());
      
    }
    const calculateItems = (cartItem) => {
        let count=0
        for (const item of cartItem) {
            count += item.frequency
        }
        return count
    }
    const calculateprice = (cartItem) => {

        let price=0
        for (const single_item of cartItem) {
            price += single_item.item.price * single_item.frequency
        }
        return price
    }
    // console.log(dublicateItem);
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Header />} />
                    <Route path='/product/:product_id' element={<Content />} />
                </Routes>
            </Router>
            <Modal show={isModalOpen} onHide={() => { }} centered>
                <Modal.Header >
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Ammount</th>
                                <th>Remove/Add from cart</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItem?.map((e, _idx) => (<>
                                <tr>
                                    <td>{e.item.title}</td>
                                    <td>{e.frequency}</td>
                                    <td>{e.item.price * e.frequency}$</td>
                                    <td>
                                        <Button variant="danger" onClick={() => deleteItem(e.item.id)}>Remove</Button>
                                        <Button variant="success" onClick={() => addCart(e.item)}>Add</Button>
                                    </td>
                                </tr>
                            </>))}
                            <tr>
                                {cartItem?.length > 0 && <>
                                    <td colSpan={2}><b>Total Items in Cart : </b>{calculateItems(cartItem)}</td>
                                    <td colSpan={2}><b>Total price : </b>{calculateprice(cartItem)}$</td>
                                </>}
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <hr />
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default App