import React, {useState} from 'react';
import { useAuth } from "context/Auth";


// reactstrap components
import { Button,
    Card,
    Form,
    Input,
    Container,
    Row,
    Col,
    Alert } from "reactstrap";

export default function ForgotPassword() {


    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const {resetPassword} = useAuth();

    const handkeSubmit = async (e) => {
        e.preventDefault();
    
        try {
            setError('');
            setMessage('');
            setLoading(true);
    
            await resetPassword(email);
            setMessage('Check your inbox for further instructions');
        } catch (error) {
            setError("Failed to reset password");
        }
    
        setLoading(false);
    }



    return(
        <div
            className="page-header"
            style={{
            backgroundImage: "url(" + require("assets/img/antoine-barres.jpg") + ")",
            }}
        >
            <div className="filter" />
            <Container>
            <Row>
                <Col className="ml-auto mr-auto" lg="4">
                <Card className="card-register ml-auto mr-auto">
                    <h3 className="title mx-auto">Reset Password</h3>



                    <Form className="register-form" onSubmit={handkeSubmit}>
                    <label>Email</label>
                    <Input placeholder="Email" 
                            type="example@email.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>


                    <Button block className="main-btn btn-round" color="danger" disabled={loading}>
                        Reset Password
                    </Button>
                    </Form>

                    <div className="mt-4">
                    {error && <Alert className="alert-danger text-center">{error}</Alert>}
                    {message && <Alert className="alert-success text-center">{message}</Alert>}
                    </div>


                    <Button
                    className="btn-link"
                    color="danger"
                    href="/login"
                    >
                    Log in
                    </Button>

                    </Card>
                </Col>
            </Row>
            </Container>
            </div>
        );
};
