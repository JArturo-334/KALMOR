/*!

=========================================================
* Paper Kit React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

// reactstrap components
import { Button,
      Card,
      Form,
      Input,
      Container,
      Row,
      Col,
      Alert } from "reactstrap";

// core components
import LoginNavbar from "components/Navbars/LoginNavbar";
import Footer from "components/Footers/Footer";

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const LogIn = async (e) => {
    e.preventDefault();

        try {
            setError('');
            setLoading(true);
    
            await signInWithEmailAndPassword(auth, email, password);
            
            navigate('/index');
          } catch (error) {
            setError("Error, Not possible to log in.");
          }
    
          setLoading(false);
    }

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  return (
    <>
      <LoginNavbar />
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
                <h3 className="title mx-auto">Welcome Back</h3>



                <Form className="register-form" onSubmit={LogIn}>
                  <label>Email</label>
                  <Input placeholder="Email" 
                          type="example@email.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}/>

                  <label>Password</label>
                  <Input placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                  <Button block className="main-btn btn-round" color="danger" disabled={loading}>
                    Log In
                  </Button>
                </Form>

                <div className="mt-4">
                  {error && <Alert className="alert-danger text-center">{error}</Alert>}
                </div>

                <div className="forgot">
                <Button
                    className="btn-link"
                    color="danger"
                    href="/register"
                  >
                    Register Here!
                  </Button>
                  <Button
                    className="btn-link"
                    color="danger"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </Button>
                </div>
                <div className="social-line text-center">
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="facebook"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-facebook" />
                  </Button>
                  <Button
                    className="btn-neutral btn-just-icon mr-1"
                    color="google"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fa fa-google" />
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>

      </div>

      <div>
          <Footer />
      </div>
    </>
  );
}

export default LoginPage;
