import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

// reactstrap components

// core components
import MainNavbar from "components/Navbars/MainNavbar.js";
import Footer from "components/Footers/Footer.js";

// sections
import SectionNucleoIcons from "views/sections/SectionNucleoIcons.js";
import ProductsHeader from "components/Headers/ProductsHeader";
import KeepInTouch from "../sections/KeepTouch";
import { Button, Card, Container, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

function Shop() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Make a GET request when the component mounts
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/products');
        // Handle the successful response here
        setProducts(response.data);
      } catch (error) {
        // Handle any errors here
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);


  async function handleDeletion(objectId){
    try {
      const response = await axios.delete(`http://localhost:4000/delete/${objectId}`);
      console.log(response);
      setProducts(products.filter(item => item._id !== objectId));
    } catch (error) {
      console.error('Error:', error);
    }
  }


  return (
    <>
      <MainNavbar />
      <div className="main">
        <ProductsHeader />
        <Container>
          <Button className="btn" color="info" href="/addproduct">New Product</Button>
          <Row xs={1} sm={2} md={3} lg={4}>
              {products.map(product => (
                <Col key={product._id}>
                  <Card className="my-3">
                    <div className="product-card">
                    <h3 className="title mx-3">{product.name}</h3>
                      <p>Price: ${product.price}</p>
                      <p className="prod-description">Description: {product.description}</p>
                    </div>
                    <Button className="btn" color="danger" onClick={() => handleDeletion(product._id)}>Delete</Button>
                    <Button className="btn" color="warning" onClick={() => navigate(`/updateproduct/${product._id}`)}>Edit</Button>
                  </Card>
                </Col>
              ))}
            </Row>
        </Container>
        <SectionNucleoIcons />
        <KeepInTouch />
        <Footer />
      </div>
    </>
  );
}

export default Shop;