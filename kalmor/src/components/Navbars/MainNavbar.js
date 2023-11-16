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
import React, { useState } from "react";
import { useAuth } from "context/Auth";

// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Alert
} from "reactstrap";

function IndexNavbar() {

  const {currentUser, logout} = useAuth();
  const [error, setError] = useState('');


  async function handleLogout() {
    setError('');

    try {
      await logout();
    } catch (error) {
      setError('Failed to Log out')
    }
  }



  //Navbar behaviour
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/index"
            title="Coded by Creative Tim"
          >
            KALMOR
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >

                <div className="mt-4">
                  {error && <Alert className="alert-danger text-center">{error}</Alert>}
                </div>

          <Nav navbar>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/Arturo.Claudio.Barrios"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fa fa-facebook-square" />
                <p className="d-lg-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/king.arthur.w/"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fa fa-instagram" />
                <p className="d-lg-none">Instagram</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.github.com/JArturo-334"
                target="_blank"
                title="Star on GitHub"
              >
                <i className="fa fa-github" />
                <p className="d-lg-none">GitHub</p>
              </NavLink>
            </NavItem>


            
            <UncontrolledDropdown inNavbar>
              <DropdownToggle
                className="py-0"
                aria-expanded={false}
                aria-haspopup={true}
                color="default"
                nav
                onClick={(e) => e.preventDefault()}
              >
                
                <Button
                  className="btn-round"
                  color="danger"
                  id="profile"
                >
                  <i className="fa fa-solid fa-user" />
                </Button>
              </DropdownToggle>


              <DropdownMenu className="dropdown-danger" right>
                <DropdownItem header >
                  {currentUser && JSON.stringify(currentUser.email)}
                </DropdownItem>
                  <DropdownItem
                    href="/profile"
                    >
                    Profile
                  </DropdownItem>
                  
                  <DropdownItem
                    href=""
                    onClick={(e) => e.preventDefault()}
                  >
                    Something else here
                  </DropdownItem>

                  <DropdownItem divider />

                  <DropdownItem
                    onClick={handleLogout}
                  >
                    Log Out
                  </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>


          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
