import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


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

function UpdateProduct() {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("index");
        return function cleanup() {
            document.body.classList.remove("index");
        };
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Retrieve the product ID from the props or the route parameters.
    const { productId } = useParams();

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        picture: '',
        rating: 5
    });

    useEffect(() => {
        // Make a GET request for a single product
        async function fetchData() {
            try {
            const response = await axios.get(`http://localhost:4000/product/${productId}`);
            // Handle the successful response here
            setProduct(response.data);
            } catch (error) {
            // Handle any errors here
            console.error('Error:', error);
            }
        }

        fetchData();
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const picture = e.target.files[0];
        setProduct({ ...product, picture });
    };

    //  SUBMIT FORM
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);

            let isAllFieldsFilled = true;

            // Check if all fields in the product object are filled
            Object.values(product).forEach((value) => {
                if (value === '' || value === null || value === undefined) {
                    isAllFieldsFilled = false;
                }
            });
        
            if (isAllFieldsFilled) {
              // Send a PUT request to update the product
                const response = await axios.put(`http://localhost:4000/updateproduct/${product._id}`, product);
                console.log(response);
            } else {
              // If not all fields are filled, make a PATCH request instead
                const response = await axios.patch(`http://localhost:4000/patchproduct/${product._id}`, product);
                console.log(response);
            }

            navigate('/shop');
        } catch (error) {
            // Handle any errors here
            console.error('Error:', error);
            setError('Failed to update the product');
        }

        setLoading(false);
    };

    return (
        <>
            <MainNavbar />
            <div className="main">
                <ProductsHeader />
                <Container className="col-6">
                    <Card className="card-register ml-auto mr-auto">
                        <Form className="register-form" onSubmit={handleSubmit}>
                            <label>Name</label>
                            <Input
                                placeholder="Product"
                                name="name"
                                type="text"
                                value={product.name}
                                onChange={handleInputChange}
                            />

                            <label>Description</label>
                            <textarea
                                placeholder="..."
                                name="description"
                                className="form-control"
                                rows="4"
                                type="text"
                                value={product.description}
                                onChange={handleInputChange}
                            />

                            <label>Price</label>
                            <Input
                                placeholder="Product"
                                name="price"
                                type="text"
                                value={product.price}
                                onChange={handleInputChange}
                            />

                            <label>Picture</label>
                            <Input
                                type="file"
                                name="picture"
                                onChange={handleImageChange}
                            />

                            <div className="mt-4">
                                {error && <Alert className="alert-danger text-center">{error}</Alert>}
                            </div>

                            <Button block className="main-btn btn-round" color="danger" disabled={loading}>
                                UPDATE
                            </Button>
                        </Form>
                    </Card>
                </Container>
                <Footer />
            </div>
        </>
    );
}

export default UpdateProduct;
