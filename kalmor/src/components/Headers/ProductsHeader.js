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

function ProductsHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth < 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(" + require("assets/img/antoine-barres.jpg") + ")",
        }}
        className="page-header page-header-xs"
        data-parallax={true}
        ref={pageHeader}
      >

<div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">KALMOR</h1>
            </div>
            <h2 className="presentation-subtitle text-center">
              Workout anywhere...
            </h2>
          </Container>
        </div>


        <div className="filter" />
      </div>
    </>
  );
}

export default ProductsHeader;
