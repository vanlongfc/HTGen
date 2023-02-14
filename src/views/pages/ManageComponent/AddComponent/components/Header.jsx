import React from "react";
import PropTypes from "prop-types";
import { Container } from "reactstrap";
import * as _ from "lodash";

function Header({
  name,
  parentName,
  handleAdd,
  handleFilter,
  options,
  ...rest
}) {
  return (
    <>
      <div className="header header-dark bg-primary pb-6 content__title content__title--calendar">
        <Container fluid>
          <div className="header-body"></div>
        </Container>
      </div>
    </>
  );
}

export default Header;
