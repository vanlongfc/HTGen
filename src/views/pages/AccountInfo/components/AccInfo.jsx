import React, { useState, useRef } from "react";
import {
  Col,
  Row,
  Button,
  Card,
  CardImg,
  CardHeader,
  CardBody,
} from "reactstrap";
import FormUpdate from "./FormUpdate";
import { Style } from "../style";
import NotificationAlert from "react-notification-alert";
import { useDispatch, useSelector } from "react-redux";

const AccInfo = () => {
  const { currentAccount } = useSelector((state) => state.accountReducer);

  const [formModal, setFormModal] = useState(false);
  const notificationAlertRef = useRef(null);

  return (
    <Style>
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Row>
        {formModal && (
          <FormUpdate
            notificationAlertRef={notificationAlertRef}
            formModal={formModal}
            setFormModal={setFormModal}
          />
        )}
        <Col md={4}>
          <Card className="card-profile">
            <CardImg
              alt="..."
              src={require("assets/default/background-default.jpg").default}
              top
              className="bg-gradient-info cardImg"
            />
            <div className="bg-gradient-info"></div>
            <Row className="justify-content-center">
              <Col className="order-lg-2" lg="3">
                <div className="card-profile-image">
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="rounded-circle bg-white"
                      src={require("assets/default/avatar-default.png").default}
                    />
                  </a>
                </div>
              </Col>
            </Row>
            <CardBody className="pt-7">
              <div className="text-center ">
                <h5 className="h3">{currentAccount?.name}</h5>
                <div className="h4 font-weight-300">
                  <i className="ni location_pin mr-2" />
                  {currentAccount?.email}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col md={8}>
          <Card style={{ height: 334 }}>
            <CardHeader>
              <div className="d-flex justify-content-between">
                <h3 className="h2 mb-0">Thông tin cá nhân</h3>
                <Button
                  onClick={() => {
                    setFormModal(true);
                  }}
                  // className="btn btn-info"
                  color="primary"
                >
                  Cập nhật thông tin cá nhân
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md={3}>
                  <h3>Họ tên</h3>
                </Col>
                <Col md={3}>{currentAccount?.name}</Col>
                <Col md={3}>
                  <h3>Giới tính</h3>
                </Col>
                <Col md={3}>{currentAccount?.gender}</Col>
                <Col md={3}>
                  <h3>Email</h3>
                </Col>
                <Col md={3}>{currentAccount?.email}</Col>
                <Col md={3}>
                  <h3>Nhóm quyền</h3>
                </Col>
                <Col md={3}>{currentAccount?.roleId?.name}</Col>
                <Col md={3}>
                  <h3>Địa chỉ</h3>
                </Col>
                <Col md={9}>{currentAccount?.address}</Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Style>
  );
};

export default AccInfo;
