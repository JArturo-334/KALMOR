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
import React from "react";

// reactstrap components

// core components
import MainNavbar from "components/Navbars/MainNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import Footer from "components/Footers/Footer.js";

// index sections
import SectionCarousel from "views/sections/SectionCarousel.js";
import SectionNucleoIcons from "views/sections/SectionNucleoIcons.js";
import KeepInTouch from "./sections/KeepTouch";

function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
      <MainNavbar />
      <IndexHeader />
      <div className="main">
        <SectionCarousel />
        <SectionNucleoIcons />
        <KeepInTouch />
        <Footer />
      </div>
    </>
  );
}

export default Index;
