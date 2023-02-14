import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { FileClipboardTextSVG } from "assets/svg";
import { DoneSVG } from "assets/svg";
import { ExpandSVG } from "assets/svg";

function CardsHeader({ name, data }) {
  return (
    <>
      <div className="header bg-primary pb-6">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="h2 text-white d-inline-block mb-0">{name}</h6>{" "}
              </Col>
            </Row>

            <Row>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <CardTitle
                      tag="h4"
                      className="text-uppercase text-muted mb-2"
                      style={{ fontSize: 14 }}
                    >
                      Title 1
                    </CardTitle>
                    <Row>
                      <div className="col">
                        <span className="h1 font-weight-bold mb-0">
                          {data.totalOrder || 0}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <FileClipboardTextSVG color="#fff" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <Link
                        to="/order-manage"
                        className="h5 text-primary text-nowrap "
                      >
                        Chi tiết {`>>`}
                      </Link>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <CardTitle
                      tag="h4"
                      className="text-uppercase text-muted mb-2"
                      style={{ fontSize: 14 }}
                    >
                      Title 2
                    </CardTitle>
                    <Row>
                      <div className="col">
                        <span className="h1 font-weight-bold mb-0">
                          {data.totalProductInProduction || 0}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                          <ExpandSVG color="#fff" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <Link
                        to="/list-product-command"
                        className="h5 text-primary text-nowrap "
                      >
                        Chi tiết {`>>`}
                      </Link>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <CardTitle
                      tag="h4"
                      className="text-uppercase text-muted mb-2"
                      style={{ fontSize: 14 }}
                    >
                      Title 3
                    </CardTitle>
                    <Row>
                      <div className="col">
                        <span className="h1 font-weight-bold mb-0">
                          {data.totalProductInQC || 0}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <DoneSVG color="#fff" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-sm">
                      <Link
                        to="/pendding-qc"
                        className="h5 text-primary text-nowrap "
                      >
                        Chi tiết {`>>`}
                      </Link>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card style={{ height: 148.8 }} className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h4"
                          className="text-uppercase text-muted mb-2"
                          style={{ fontSize: 14 }}
                        >
                          Title 4
                        </CardTitle>
                      </div>
                    </Row>
                    <Row>
                      <Col xs={9}>
                        <p
                          className="mb-1 text-primary font-weight-600"
                          style={{ fontSize: 13 }}
                        >
                          Sub 1 :
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          className="mb-1 font-weight-600"
                          style={{ fontSize: 13 }}
                        >
                          {data.totalProductInStage || 0}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={9}>
                        <p
                          className="mb-1 text-primary font-weight-600"
                          style={{ fontSize: 13 }}
                        >
                          Sub 2 :
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          className="mb-1 font-weight-600"
                          style={{ fontSize: 13 }}
                        >
                          {data.totalProductInPack || 0}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={9}>
                        <p
                          className="mb-1 text-primary font-weight-600"
                          style={{ fontSize: 13 }}
                        >
                          Sub 3 :
                        </p>
                      </Col>
                      <Col xs={3}>
                        <p
                          className="mb-1 font-weight-600"
                          style={{ fontSize: 13 }}
                        >
                          {data.totalProductInFix || 0}
                        </p>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

CardsHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default CardsHeader;
