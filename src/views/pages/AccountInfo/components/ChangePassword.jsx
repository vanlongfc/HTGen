import React, { useState, useEffect, useRef } from "react";
import InputCustom from "views/pages/components/InputCustom";
import { Row, Card, Col, CardBody, CardImg } from "reactstrap";
import { Style } from "../style";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { notify } from "common";
import NotificationAlert from "react-notification-alert";
import { accountActions } from "Redux/Actions";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import RequireCustom from "views/pages/components/RequireCustom";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { currentAccount, isAccountChangePassword } = useSelector(
    (state) => state.accountReducer
  );
  const history = useHistory();

  const notificationAlertRef = useRef(null);
  const [passwords, setPasswords] = React.useState({
    oldPassword: "",
    newPassword: "",
    newPasswordRetype: "",
  });
  const passwordSchema = yup.object().shape({
    oldPassword: yup.string().required("Vui lòng nhập mật khẩu hiện tại!"),
    newPassword: yup
      .string()
      .required("Vui lòng nhập mật khẩu mới!")
      .matches(
        "[^wd]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))",
        "Mật khẩu phải chứa ít nhất một chữ và một số!"
      )
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự!"),
    newPasswordRetype: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Mật khẩu không trùng khớp!")
      .required("Vui lòng xác nhận mật khẩu!"),
  });

  const onSubmit = (values) => {
    dispatch(
      accountActions.accountChangePassword(
        currentAccount?.id,
        { oldPassword: values.oldPassword, newPassword: values.newPassword },
        {
          success: () => {
            notify(
              notificationAlertRef,
              "success",
              "Thông báo",
              `Thiết lập mật khẩu thành công!`
            );
            setTimeout(() => {
              dispatch(
                accountActions.accountLogOut({
                  refreshToken: localStorage.getItem("refreshtoken"),
                })
              );
              history.push("/auth/login");
            }, 2000);
          },
          failed: (mess) => {
            notify(
              notificationAlertRef,
              "danger",
              "Thông báo",
              `Thiết lập mật khẩu thất bại. Lỗi: ${mess}!`
            );
          },
        }
      )
    );
  };

  return (
    <Style>
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Formik
        initialValues={passwords}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={passwordSchema}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
          errors,
          touched,
          resetForm,
          handleBlur,
        }) => {
          return (
            <Row>
              <Col md={4}>
                <Card className="card-profile">
                  <CardImg
                    alt="..."
                    src={
                      require("assets/default/background-default.jpg").default
                    }
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
                            src={
                              require("assets/default/avatar-default.png")
                                .default
                            }
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
                <Card>
                  <CardBody className="d-flex flex-column align-items-center">
                    <div style={{ minWidth: 300 }}>
                      <InputCustom
                        label="Mật khẩu hiện tại"
                        required={<RequireCustom />}
                        placeholder="Vui lòng nhập mật khẩu hiện tại"
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        onBlur={handleBlur}
                        invalid={errors.oldPassword && touched.oldPassword}
                        value={values.oldPassword}
                        onChange={(e) => {
                          setFieldValue("oldPassword", e.target.value.trim());
                        }}
                        messageInvalid={
                          errors.oldPassword && touched.oldPassword
                            ? errors.oldPassword
                            : ""
                        }
                        className="max-height-input-custom"
                        style={{ maxWidth: 300 }}
                      />
                      <InputCustom
                        className="max-height-input-custom"
                        label="Mật khẩu mới"
                        required={<RequireCustom />}
                        placeholder="Vui lòng nhập mật khẩu mới"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        onBlur={handleBlur}
                        invalid={errors.newPassword && touched.newPassword}
                        value={values.newPassword}
                        onChange={(e) => {
                          setFieldValue("newPassword", e.target.value.trim());
                        }}
                        messageInvalid={
                          errors.newPassword && touched.newPassword
                            ? errors.newPassword
                            : ""
                        }
                        style={{ maxWidth: 300 }}
                      />
                      <InputCustom
                        className="max-height-input-custom"
                        label="Xác nhận mật khẩu"
                        required={<RequireCustom />}
                        placeholder="Vui lòng nhập lại mật khẩu mới"
                        type="password"
                        onBlur={handleBlur}
                        id="newPasswordRetype"
                        name="newPasswordRetype"
                        invalid={
                          errors.newPasswordRetype && touched.newPasswordRetype
                        }
                        value={values.newPasswordRetype}
                        onChange={(e) => {
                          setFieldValue(
                            "newPasswordRetype",
                            e.target.value.trim()
                          );
                        }}
                        messageInvalid={
                          errors.newPasswordRetype && touched.newPasswordRetype
                            ? errors.newPasswordRetype
                            : ""
                        }
                        style={{ maxWidth: 300 }}
                      />
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                      <LoadingButtonCustom
                        loading={isAccountChangePassword}
                        onClick={handleSubmit}
                        color="primary"
                        size="md"
                        type="button"
                      >
                        Cập nhật
                      </LoadingButtonCustom>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          );
        }}
      </Formik>
    </Style>
  );
};

export default ChangePassword;
