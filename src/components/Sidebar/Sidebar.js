import React from "react";
import { useLocation, NavLink as NavLinkRRD, Link } from "react-router-dom";
import classnames from "classnames";
import { PropTypes } from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";
import { useSelector } from "react-redux";
import _ from "lodash";
import { checkRole } from "common";
function Sidebar({
  toggleSidenav,
  // sidenavOpen,
  routes,
  logo,
  rtlActive,
  routeAdmin,
}) {
  const { currentAccount } = useSelector((state) => state.accountReducer);

  const [state, setState] = React.useState({});
  const [routeAdminState, setRouteAdminState] = React.useState({});
  const location = useLocation();
  React.useEffect(() => {
    setState(getCollapseStates(routes));
    // eslint-disable-next-line
    setRouteAdminState(getCollapseStates(routeAdmin));
  }, []);
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.split("/").indexOf(routeName) > -1 ? "active" : "";
  };
  // makes the sidenav normal on hover (actually when mouse enters on it)
  const onMouseEnterSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  };
  // makes the sidenav mini on hover (actually when mouse leaves from it)
  const onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  };
  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  const closeSidenav = () => {
    if (window.innerWidth < 1200) {
      toggleSidenav();
    }
  };
  function createMarkup(svg) {
    return {
      __html: svg,
    };
  }

  function IconComponent({ svg }) {
    return <div dangerouslySetInnerHTML={createMarkup(svg)}></div>;
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      const validRole = checkRole(currentAccount, prop);
      if (prop.redirect || prop.children || !validRole) {
        return null;
      }
      if (prop.big) {
        // var st = {};
        // st[prop["state"]] = !state[prop.state];
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              // data-toggle="collapse"
              aria-expanded={state[prop.state]}
              tag={NavLinkRRD}
              className={classnames({
                active: location.pathname.indexOf(prop.path) !== -1,
              })}
              style={
                location.pathname.indexOf(prop.path) !== -1
                  ? { backgroundColor: "rgba(94, 114, 228, 0.4)" }
                  : {}
              }
            >
              {prop.svg ? (
                <>
                  <IconComponent svg={prop.svg} />{" "}
                  <span className="nav-link-text" style={{ fontSize: "15px" }}>
                    {prop.name}
                  </span>{" "}
                </>
              ) : prop.icon ? (
                <>
                  <i
                    className={prop.icon}
                    style={{
                      fontSize: "1.25rem",
                      color: "#5E72E4 ",
                    }}
                  />
                  <span className="nav-link-text" style={{ fontSize: "15px" }}>
                    {prop.name}
                  </span>
                </>
              ) : prop.miniName ? (
                <>
                  <span className="sidenav-mini-icon"> {prop.miniName} </span>
                  <span className="sidenav-normal text-sm"> {prop.name} </span>
                </>
              ) : null}
            </NavLink>
          </NavItem>
        );
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <NavItem key={key}>
            <NavLink
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={state[prop.state]}
              className={classnames({
                active: getCollapseInitialState(prop.views),
              })}
              style={
                getCollapseInitialState(prop.views)
                  ? { backgroundColor: "rgba(94, 114, 228, 0.4)" }
                  : {}
              }
              onClick={(e) => {
                e.preventDefault();
                setState(st);
              }}
            >
              {prop.svg ? (
                <>
                  <IconComponent svg={prop.svg} />{" "}
                  <span className="nav-link-text" style={{ fontSize: "15px" }}>
                    {prop.name}
                  </span>{" "}
                </>
              ) : prop.icon ? (
                <>
                  <i
                    className={prop.icon}
                    style={{
                      fontSize: "1.25rem",
                      color: "#5E72E4 ",
                    }}
                  />
                  <span className="nav-link-text" style={{ fontSize: "15px" }}>
                    {prop.name}
                  </span>
                </>
              ) : prop.miniName ? (
                <>
                  <span className="sidenav-mini-icon"> {prop.miniName} </span>
                  <span className="sidenav-normal text-sm"> {prop.name} </span>
                </>
              ) : null}
            </NavLink>
            <Collapse isOpen={state[prop.state]}>
              <Nav className="nav-sm flex-column">
                {!_.isEmpty(currentAccount) && createLinks(prop.views)}
              </Nav>
            </Collapse>
          </NavItem>
        );
      }
      return (
        <NavItem className={activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink
            to={prop.layout + prop.path}
            activeClassName="text-primary"
            onClick={closeSidenav}
            tag={NavLinkRRD}
          >
            {prop.svg ? (
              <>
                <IconComponent svg={prop.svg} />{" "}
                <span className="nav-link-text" style={{ fontSize: "15px" }}>
                  {prop.name}
                </span>{" "}
              </>
            ) : prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <span className="nav-link-text" style={{ fontSize: "15px" }}>
                  {prop.name}
                </span>
              </>
            ) : prop.miniName !== undefined ? (
              <>
                <span className="sidenav-mini-icon"> {prop.miniName} </span>
                <span className="sidenav-normal text-sm"> {prop.name} </span>
              </>
            ) : (
              prop.name
            )}
          </NavLink>
        </NavItem>
      );
    });
  };

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }
  const scrollBarInner = (
    <div className="scrollbar-inner">
      <div className="sidenav-header d-flex align-items-center justify-content-center">
        {/* {logo ? (
					<NavbarBrand style={{ width: "100%" }} {...navbarBrandProps}>
						<img
							alt={logo.imgAlt}
							className="navbar-brand-img"
							src={logo.imgSrc}
							style={{ maxHeight: "unset" }}
						/>
					</NavbarBrand>
				) : null} */}
        <h1 className="text-black font-weight-600" style={{ fontSize: "40px" }}>
          LOGO
        </h1>
      </div>
      <div className="navbar-inner">
        <Collapse navbar isOpen={true}>
          <Nav navbar>{!_.isEmpty(currentAccount) && createLinks(routes)}</Nav>
          <h6 className="navbar-heading p-0 text-muted mt-3 mb-0">
            <span className="docs-normal">Quản Trị cơ sở</span>
            <span className="docs-mini">QTCS</span>
          </h6>
          <hr className="mb-3 mt-1" />
          <Nav navbar>
            {!_.isEmpty(currentAccount) && createLinks(routeAdmin)}
          </Nav>
        </Collapse>
      </div>
    </div>
  );
  return (
    <Navbar
      className={
        "sidenav navbar-vertical navbar-expand-xs navbar-light bg-white " +
        (rtlActive ? "" : "fixed-left")
      }
      onMouseEnter={onMouseEnterSidenav}
      onMouseLeave={onMouseLeaveSidenav}
    >
      {navigator.platform.indexOf("Win") > -1 ? (
        <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
      ) : (
        scrollBarInner
      )}
    </Navbar>
  );
}

Sidebar.defaultProps = {
  routes: [{}],
  toggleSidenav: () => {},
  sidenavOpen: false,
  rtlActive: false,
};

Sidebar.propTypes = {
  // function used to make sidenav mini or normal
  toggleSidenav: PropTypes.func,
  // prop to know if the sidenav is mini or normal
  sidenavOpen: PropTypes.bool,
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  // logo
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
  // rtl active, this will make the sidebar to stay on the right side
  rtlActive: PropTypes.bool,
};

export default Sidebar;
