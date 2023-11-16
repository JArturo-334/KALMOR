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
/*eslint-disable*/
import React from "react";

// reactstrap components
import { 
  Container,
  Button, 
  } from "reactstrap";

// core components

function IndexHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/background_img.jpg") + ")",
        }}
      >
        <div className="filter" />
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")",
          }}
        />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">KALMOR</h1>
            </div>
            <h2 className="presentation-subtitle text-center">
              Workout anywhere...
            </h2>
            <div className="text-center">
            <Button
                className="content-center"
                color="neutral"
                outline
                href="/shop"
                id="shop"
              >
                SHOP NOW
              </Button>
              </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default IndexHeader;
