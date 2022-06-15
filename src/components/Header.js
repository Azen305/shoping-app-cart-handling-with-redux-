import React, { useState } from 'react'
import axios from "axios";
import { Container, Navbar, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from '../actions/Root';

import useAddItem from '../useAddItem';






const Header = () => {
    const baseUrl = "https://fakestoreapi.com/products";
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true)
    const [apiData, setApiData] = useState([]);
    const [categorylist, setCategorylist] = useState([]);
    const [categoryWiselist, setCategoryWiselist] = useState([]);
    const { addCart } =useAddItem()
    // const [apiData,setApiData]=useState([]);
    React.useEffect(() => {
        axios.get(baseUrl).then(response => {
            setApiData(response.data);
            setCategoryWiselist(response.data);
            setCategorylist((response.data.map(item => item.category).filter(function (e, pos, self) {
                return self.indexOf(e) == pos;
            })));
            console.log((response.data.map(item => item.category).filter(function (e, pos, self) {
                return self.indexOf(e) == pos;
            })));
            setLoader(false)
        })
    }, []);

    

    function showCategoryItem(i) {
        console.log(i);
        setCategoryWiselist(apiData.filter(item => item.category == i));
        console.log(apiData);
    }
    function sentToContent(a) {
        console.log(a);
        navigate("/product/" + a)
    }


const openModal=()=>{
    dispatch(openModalAction());
}
// const closeModal=()=>{
//     dispatch(closeModalAction());
// }
if(loader){
    return <h1>Loading.......</h1>
}
    return (
        <>
            <navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="javascript:void(0)" onClick={() => { setCategoryWiselist(apiData) }}>Brand</Navbar.Brand>
                    {categorylist?.length > 0 && categorylist?.map((item, idx) => (<Button className="mx-3" key={idx + 1} variant="primary" onClick={() => showCategoryItem(item)}>{item}</Button>))}
                    <Button className="mx-3" variant="primary" onClick={openModal}>cart items</Button>
                </Container>
            </navbar>

            <Container>
                <Row xs={1} md={2} className="g-4">
                    {categoryWiselist?.length > 0 && categoryWiselist?.map(item => <>
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={item.image} />
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>{item.description}</Card.Text>
                                </Card.Body>
                                <Button className="mx-3" variant="primary" onClick={() => sentToContent(item.id)}>click here</Button>
                                <br />
                                <Button className="mx-3" variant="primary" onClick={() => addCart(item)}>Add to cart</Button>
                            </Card>
                        </Col>
                    </>)}
                </Row>
            </Container>
        </>
    )
}

export default Header