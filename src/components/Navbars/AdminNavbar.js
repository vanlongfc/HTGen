import React, { useEffect, useState } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  ListGroupItem,
  ListGroup,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { accountActions } from "Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import routes, { routeAdmin } from "routes.js";
import { useLocation } from "react-router-dom";

function AdminNavbar({ theme, sidenavOpen, toggleSidenav }) {
  // function that on mobile devices makes the search open\
  const { currentAccount } = useSelector((state) => state.accountReducer);
  const [currentPageName, setCurrentPageName] = useState("");
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const openSearch = () => {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  };
  // function that on mobile devices makes the search close
  const closeSearch = () => {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  };

  const getRoutes = (routes, name) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views, prop.name);
      }
      if (
        prop.layout === "/" &&
        location.pathname.split("/")[1] === `/${prop.path}`.split("/")[1]
      ) {
        setCurrentPageName(name === "" ? prop.name : `${name} - ${prop.name}`);
        return null;
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    getRoutes([...routes, ...routeAdmin], "");
  }, [window.location.href]);

  return (
    <>
      <Navbar
        className={classnames(
          "navbar-top navbar-expand border-bottom",
          { "navbar-dark bg-primary": theme === "dark" },
          { "navbar-light bg-secondary": theme === "light" }
        )}
      >
        <Container fluid>
          <Collapse navbar isOpen={true}>
            <div
              onClick={toggleSidenav}
              className={classnames("sidenav-toggler d-none d-xl-block", {
                active: true,
              })}
            >
              <div className="sidenav-toggler-inner">
                <i className="sidenav-toggler-line" />
                <i className="sidenav-toggler-line" />
                <i className="sidenav-toggler-line" />
                <i className="sidenav-toggler-line" />
                <i className="sidenav-toggler-line" />
              </div>
            </div>
            <p style={{ textTransform: "none" }} className="navbar-top name">
              {currentPageName}
            </p>

            <Nav className="align-items-center ml-md-auto" navbar></Nav>
            <Nav className="align-items-center ml-auto ml-md-0" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  style={{ cursor: "pointer" }}
                  className="nav-link pr-0"
                  color=""
                  tag="a"
                >
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={
                          require("assets/default/avatar-default.png").default
                        }
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {currentAccount?.name}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/account-info/0001/0">
                    <i className="ni ni-single-02" />
                    <span>Thiết lập tài khoản</span>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      dispatch(
                        accountActions.accountLogOut({
                          refreshToken: localStorage.getItem("refreshtoken"),
                        })
                      );
                      history.push("/auth/login");
                    }}
                  >
                    <i className="ni ni-user-run" />
                    <span>Đăng xuất</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: "dark",
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
};

export default AdminNavbar;
