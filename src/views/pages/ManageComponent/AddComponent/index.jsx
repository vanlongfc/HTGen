import { UserProfileSVG } from "assets/svg";
import { PaperSVG } from "assets/svg";
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Container, Row } from "reactstrap";
import Header from "./components/Header";
import Tab2 from "./tabs/Tab2";
import Tab1 from "./tabs/Tab1";
import { Styles } from "./styles";
import { useParams, useHistory, useLocation } from "react-router-dom";

const AddOrder = () => {
  const location = useLocation();
  const history = useHistory();

  const [sectionState, setSectionState] = useState(0);

  useEffect(() => {
    if (location.pathname.includes("add-order/customer")) {
      setSectionState(1);
    }
  }, [location]);

  const handleChangeTab = (tab) => {
    setSectionState(tab);
  };

  return (
    <Styles>
      <Header name="Thêm mới ..."></Header>
      <Container fluid className="mt--6">
        <Card className="p-3">
          <CardHeader className="py-0">
            <Row className="mx-0">
              <Row
                className={`align-items-center py-3 mx-0 ${
                  sectionState === 0 ? "borderBottomActive" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/add-order");
                  setSectionState(0);
                }}
              >
                <PaperSVG />
                <p
                  className={`h5 mb-0 ml-3 text-uppercase ${
                    sectionState !== 0 && "text-muted"
                  }`}
                >
                  Tab 1
                </p>
              </Row>
              <Row
                className={`align-items-center py-3 ml-5 mx-0 ${
                  sectionState === 1 ? "borderBottomActive" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSectionState(1);
                }}
              >
                <UserProfileSVG />
                <p
                  className={`h5 mb-0 ml-3 text-uppercase ${
                    sectionState !== 1 && "text-muted"
                  }`}
                >
                  Tab 2
                </p>
              </Row>
            </Row>
          </CardHeader>
          <CardBody>
            {sectionState === 0 ? (
              <Tab1 handleChangeTab={handleChangeTab} />
            ) : (
              <Tab2 handleChangeTab={handleChangeTab} />
            )}
          </CardBody>
        </Card>
      </Container>
    </Styles>
  );
};

export default AddOrder;
