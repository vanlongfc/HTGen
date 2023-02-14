import React, { useEffect, useState, useRef } from "react";
import {
  useLocation,
  Route,
  Switch,
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import _ from "lodash";
import routes, { routeAdmin } from "routes.js";
import { useSelector, useDispatch } from "react-redux";
import { accountActions } from "Redux/Actions";
import queryString from "query-string";
import { checkRole } from "common";

function Admin() {
  const { currentAccount } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  const { tab } = useParams();
  const history = useHistory();
  const [sidenavOpen, setSidenavOpen] = useState(true);
  const location = useLocation();
  const [redirectDefault, setRedirectDefault] = useState("/auth/login");
  let dR = "/auth/login";
  const mainContentRef = useRef(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (
      mainContentRef.current !== null &&
      mainContentRef.current !== undefined
    ) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      const validRole = checkRole(currentAccount, prop);
      if (prop.layout === "/" && validRole) {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  // toggles collapse between mini sidenav and normal
  const toggleSidenav = (e) => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-hidden");
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-show");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-show");
      document.body.classList.remove("g-sidenav-hidden");
    }
    setSidenavOpen(!sidenavOpen);
  };
  const getNavbarTheme = () => {
    return location.pathname.indexOf("/alternative-dashboard") === -1
      ? "dark"
      : "light";
  };

  useEffect(() => {
    document.addEventListener("wheel", function (event) {
      if (document.activeElement.type === "number") {
        document.activeElement.blur();
      }
    });
    dispatch(
      accountActions.getCurrentAccount(
        localStorage.getItem("id"),
        queryString.stringify({ populate: "roleId" })
      )
    );
  }, [window.location.href]);

  const handleRedirectDefault = (routes) => {
    routes.forEach((prop, key) => {
      const validRole = checkRole(currentAccount, prop);
      if (prop.redirect || prop.children || !validRole) {
        return null;
      }
      if (dR === "/auth/login" && prop.layout && prop.path) {
        dR = prop.layout + prop.path;
        setRedirectDefault(prop.layout + prop.path);
      }
      if (prop.collapse) {
        handleRedirectDefault(prop.views);
      }
    });
  };

  useEffect(() => {
    if (!_.isEmpty(currentAccount)) {
      handleRedirectDefault([...routes, ...routeAdmin]);
    }
  }, [currentAccount]);

  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("token") === "" ||
    !localStorage.getItem("refreshtoken") ||
    localStorage.getItem("refreshtoken") === "" ||
    !localStorage.getItem("id") ||
    localStorage.getItem("id") === ""
  ) {
    // setRedirectDefault("/auth/login");
    return <Redirect to="/auth/login" />;
  }

  return (
    <>
      <Sidebar
        routes={routes}
        toggleSidenav={toggleSidenav}
        sidenavOpen={sidenavOpen}
        logo={{
          innerLink: "/",
          imgSrc: require("assets/img/brand/fovina-logo.png").default,
          imgAlt: "Fovina Logo",
        }}
        routeAdmin={routeAdmin}
        setRedirectDefault={setRedirectDefault}
      />
      <div className="main-content" ref={mainContentRef}>
        <AdminNavbar
          theme={getNavbarTheme()}
          toggleSidenav={toggleSidenav}
          sidenavOpen={sidenavOpen}
          brandText={getBrandText(location.pathname)}
        />
        {!_.isEmpty(currentAccount) && redirectDefault !== "/auth/login" && (
          <Switch>
            {getRoutes(routes)}
            {getRoutes(routeAdmin)}
            <Redirect from="*" to={redirectDefault} />
          </Switch>
        )}
        <AdminFooter />
      </div>
      {sidenavOpen ? (
        <div className="backdrop d-xl-none" onClick={toggleSidenav} />
      ) : null}
    </>
  );
}

export default Admin;
