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
import { auth, firestore } from "../../firebase";
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";

// reactstrap components
import { 
  Button,
  Card,
  Form,
  Input,
  Container,
  Row,
  Col,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Alert} from "reactstrap";

import ReactDatetime from "react-datetime";

// core components
import LoginNavbar from "components/Navbars/LoginNavbar";
import Footer from "components/Footers/Footer";
import { useNavigate } from "react-router-dom";

function RegisterPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const birthdate = e.target.birthdate.value;
    const username = e.target.username.value;
    const fullName = e.target.fullname.value;
    const passwordConfirmation = e.target.passwordConfirmation.value;

      // Add validation logic here to ensure the password and password confirmation match
    if (password !== passwordConfirmation) {
      return setError("Passwords do not match");
    }

    try {
        setError('');
        setLoading(true);

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        // Store custom user data in Firestore
        const db = collection(firestore, 'users');
        await addDoc(db, {
          uid: user.uid,
          fullName: fullName,
          username: username,
          birthdate: birthdate,
        });

        navigate('/index');

      } catch (error) {
        setError("Error registering the user");
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

        {/* Signup */}
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" lg="4">
              <Card className="card-register ml-auto mr-auto">
                <h3 className="title mx-auto">Welcome</h3>

                <Form className="register-form" onSubmit={handleSubmit}>
                  <label>Email</label>
                  <Input placeholder="example@mail.com" 
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required/>


                  <label>Username</label>
                  <Input placeholder="Username" type="text" name="username" required/>

                  <label>Full name</label>
                  <Input placeholder="Name and Last Name" type="text" name="fullname" required/>

                  <label>Birth date</label>
                  <FormGroup>
                    <InputGroup className="date" id="datetimepicker">
                      <ReactDatetime
                        inputProps={{
                          name: "birthdate",
                          placeholder: "Datet Picker",
                          required: true                          
                        }}
                        timeFormat={false}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <span className="glyphicon glyphicon-calendar">
                            <i aria-hidden={true} className="fa fa-calendar" />
                          </span>
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  


                  <label>Password</label>
                  <Input placeholder="Password" type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required />


                  <label>Confirm Password</label>
                  <Input placeholder="Confirm Password" type="password" name="passwordConfirmation" required/>


                  <Button block className="btn-round" color="danger" type="submit" disabled={loading}>
                    Register
                  </Button>
                </Form>

                <div className="mt-4">
                  {error && <Alert className="alert-danger text-center">{error}</Alert>}
                </div>


                  <Button
                    className="btn-link"
                    color="danger"
                    href="/login"
                  >
                    Already have and account?
                  </Button>
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

export default RegisterPage;
