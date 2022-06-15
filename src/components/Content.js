import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from '../actions/Root';
import useAddItem from '../useAddItem';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Content = () => {
  const params = useParams();
  const baseUrl = `https://fakestoreapi.com/products/${params.product_id}`;
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [post, setPost] = React.useState([]);
  const { addCart } = useAddItem()
const [ loader, setLoader]=useState(true)
  React.useEffect(() => {
    axios.get(baseUrl).then(response => { setPost(response.data); console.log(response.data);setLoader(false) });
  }, []);
  const openModal = () => {
    dispatch(openModalAction());
  }
  if(loader){
    return <h1>Loading........</h1>
  }
  return (
    <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={post.image} />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.description}
        </Card.Text>
        <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
        <br />
          <Button variant="primary" onClick={() => addCart(post)}>Add to Carts</Button>
      </Card.Body>
    </Card>
      <Button className="mx-3" variant="primary" onClick={openModal}>cart items</Button>
    </>
    
  )
}

export default Content;