import React from "react";
import { useState } from "react";
import axios from "axios";

// reactstrap components

// core components
import MainNavbar from "components/Navbars/MainNavbar.js";
import Footer from "components/Footers/Footer.js";

// sections
import ProductsHeader from "components/Headers/ProductsHeader";

import { 
    Card,
    Container,
    Form,
    Input,
    Alert,
    Button} from "reactstrap";
import { useNavigate } from "react-router-dom";


function AddProduct() {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("index");
        return function cleanup() {
        document.body.classList.remove("index");
        };
    });

    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        picture: '',
        rating: 5
    });
    
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    };

    
    // const handleImageChange = (e) => {
    //     const picture = e.target.files[0];
    //     setProduct({ ...product, picture });
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);

            const response = await axios.post('http://localhost:4000/products', product);
            console.log(response);
            navigate('/shop');
        } catch (error) {
            // Handle any errors here
            console.error('Error:', error);
            setError('Failed to save new product');
        }

        setLoading(false);

    }


    return (
    <>
        <MainNavbar />
        <div className="main">
        <ProductsHeader />
        <Container>
                <Card className="card-register ml-auto mr-auto">
                <Form className="register-form" onSubmit={handleSubmit}>
                    <label>Name</label>
                    <Input placeholder="Product" 
                            name="name"
                            type="text" 
                            value={product.name}
                            onChange={handleInputChange}
                            />

                    <label>Description</label>
                    <textarea placeholder="..."
                        name="description"
                        className="form-control"
                        rows="4"
                        type="text"
                        value={product.description}
                        onChange={handleInputChange}
                        />

                    <label>Price</label>
                    <Input placeholder="Product" 
                            name="price"
                            type="text" 
                            value={product.price}
                            onChange={handleInputChange}
                            />

                    <label>Picture</label>
                    <Input placeholder="img..."
                            type="file"
                            name="picture"
                            value={product.picture}
                            onChange={handleInputChange}
                            />

                <div className="mt-4">
                    {error && <Alert className="alert-danger text-center">{error}</Alert>}
                </div>

                    <Button block className="main-btn btn-round" color="danger" disabled={loading}>
                        SAVE
                    </Button>
                </Form>
                </Card>
        </Container>
        <Footer />
        </div>
    </>
    );
}

export default AddProduct;