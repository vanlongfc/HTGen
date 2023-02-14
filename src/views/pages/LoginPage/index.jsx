import React, { useState } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import AuthHeader from "components/Headers/AuthHeader";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { accountActions } from "Redux/Actions";
import HelperText from "views/pages/components/HelperText";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import { Formik } from "formik";
import * as yup from "yup";

const LoginPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const accountSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email không đúng định dạng!")
      .required("Email không được để trống!"),
    password: yup.string().required("Mật khẩu không được để trống!"),
  });

  const [accountInfo, setAccountInfo] = useState({
    email: "",
    password: "",
  });
  const { isLogIn } = useSelector((state) => state.accountReducer);
  const [message, setMessages] = React.useState("");

  localStorage.clear();

  const onSubmit = (values) => {
    dispatch(
      accountActions.accountLogin(values, {
        success: (data) => {
          setMessages("");
          localStorage.setItem("token", data.tokens.access.token);
          localStorage.setItem("roleId", data.user.roleId);
          localStorage.setItem("refreshtoken", data.tokens.refresh.token);
          localStorage.setItem("id", data.user.id);
          history.push("/");
        },
        failed: (mess) => {
          setMessages(mess);
        },
      })
    );
  };

  return (
    <>
      <AuthHeader
        title="Hệ thống quản lý ..."
        lead="Đăng nhập để sử dụng các chức năng của hệ thống"
      />
      <Formik
        initialValues={accountInfo}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={accountSchema}
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
            <Container className="mt--8 pb-5">
              <Row className="justify-content-center">
                <Col lg="5" md="8">
                  <Card className="bg-secondary border-0 mb-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <h1 className="text-center text-uppercase">Đăng nhập</h1>
                      <Form role="form">
                        <FormGroup>
                          <InputGroup className="input-group-merge input-group-alternative mb-0">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              value={values.email}
                              placeholder="Email"
                              type="email"
                              name="email"
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue("email", e.target.value);
                              }}
                            />
                          </InputGroup>
                          {errors.email && touched.email && (
                            <HelperText message={errors.email} />
                          )}
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-merge input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              name="password"
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue("password", e.target.value);
                              }}
                            />
                          </InputGroup>
                          {errors.password && touched.password && (
                            <HelperText message={errors.password} />
                          )}
                        </FormGroup>
                        <div className="d-flex justify-content-center">
                          {message !== "" ? (
                            <span className="text-danger">{message}</span>
                          ) : null}
                        </div>
                        <div className="text-center">
                          <LoadingButtonCustom
                            loading={isLogIn}
                            onClick={handleSubmit}
                            className="mt-4"
                            color="info"
                            type="submit"
                            outline={false}
                            block={false}
                          >
                            Đăng nhập
                          </LoadingButtonCustom>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row>
                    <Col xs="6">
                      <a className="text-light" href="forgot-password">
                        <small>Quên mật khẩu ?</small>
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          );
        }}
      </Formik>
    </>
  );
};

export default LoginPage;
