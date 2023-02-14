import React, { useState, useEffect } from "react";
import {
  Modal,
  Card,
  CardHeader,
  CardBody,
  Form,
  Col,
  FormGroup,
  Button,
  Input,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import RequireCustom from "views/pages/components/RequireCustom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { emailRegex, notify } from "common";
import { accountActions, roleActions } from "Redux/Actions";
import queryString from "query-string";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import { Formik } from "formik";
import * as yup from "yup";
import Error from "views/pages/components/Error";
import Select from "react-select";

const FormAccount = ({
  formModal,
  setFormModal,
  isModalAdd,
  account,
  notificationAlertRef,
  handleGetAccounts,
}) => {
  const { isCreateAccount, isUpdateAccount } = useSelector(
    (state) => state.accountReducer
  );
  const { roles } = useSelector((state) => state.roleReducer);
  const dispatch = useDispatch();
  const [roleValue, setRoleValue] = useState(null);
  const [roleSearch, setRoleSearch] = useState("");
  const [focused, setFocused] = useState({
    roleId: false,
  });
  const accountSchema = yup.object().shape({
    name: yup.string().required("Tên không được để trống!"),
    email: yup
      .string()
      .email("Email không đúng định dạng!")
      .required("Email không được để trống!"),
    roleId: yup.string().required("Vui lòng chọn nhóm quyền!"),
    // address: yup.string().required("Địa chỉ không được để trống!"),
  });
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    email: "",
    gender: "Nữ",
    // roleId: "60a4834ef41cd729f859765a",
    roleId: "",
    status: "active",
  });

  const onSubmit = (values, actions) => {
    // isModalAdd
    //   ? dispatch(
    //       accountActions.createAccount(
    //         {
    //           name: values.name,
    //           email: values.email,
    //           roleId: values.roleId,
    //           gender: values.gender,
    //           address: values.address,
    //           // status: values.status,
    //         },
    //         {
    //           success: () => {
    //             notify(
    //               notificationAlertRef,
    //               "success",
    //               "Thông báo",
    //               `Thêm thông tin tài khoản ${values.email} thành công!`
    //             );
    //             clearData();
    //             actions.resetForm();
    //             handleGetAccounts();
    //             setFormModal(false);
    //           },
    //           failed: (mess) => {
    //             notify(
    //               notificationAlertRef,
    //               "danger",
    //               "Thông báo",
    //               `Thêm thông tin tài khoản ${values.email} thất bại. Lỗi: ${mess}!`
    //             );
    //           },
    //         }
    //       )
    //     )
    //   : dispatch(
    //       accountActions.updateAccount(
    //         account.id,
    //         {
    //           name: values.name,
    //           roleId: values.roleId,
    //           gender: values.gender,
    //           email: values.email,
    //           address: values.address,
    //           status: values.status,
    //         },
    //         {
    //           success: () => {
    //             notify(
    //               notificationAlertRef,
    //               "success",
    //               "Thông báo",
    //               `Cập nhật thông tin tài khoản ${values.email} thành công!`
    //             );
    //             clearData();
    //             actions.resetForm();
    //             handleGetAccounts();
    //             setFormModal(false);
    //           },
    //           failed: (mess) => {
    //             notify(
    //               notificationAlertRef,
    //               "danger",
    //               "Thông báo",
    //               `Cập nhật thông tin tài khoản ${values.email} thất bại. Lỗi: ${mess}!`
    //             );
    //           },
    //         }
    //       )
    //     );
  };

  const clearData = () => {
    setAccountInfo({
      name: "",
      email: "",
      gender: "Nữ",
      // roleId: "60a4834ef41cd729f859765a",
      roleId: "",
      status: "active",
    });
    setFocused({
      roleId: false,
    });
    setRoleValue(null);
  };

  useEffect(() => {
    if (!_.isEmpty(account) && !isModalAdd) {
      setAccountInfo({ ...account, roleId: account?.roleId?.id });
      setRoleValue({
        label: account?.roleId?.name,
        value: account?.roleId?.id,
      });
    }
    handleGetRoles();
  }, [account]);

  const handleGetRoles = () => {
    if (roleSearch === "") {
      dispatch(
        roleActions.getRoles(queryString.stringify({ limit: 999999, page: 1 }))
      );
    } else {
      dispatch(
        roleActions.getRoles(
          queryString.stringify({ limit: 999999, page: 1, name: roleSearch })
        )
      );
    }
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={formModal}
        toggle={() => {
          setFormModal(false);
        }}
      >
        <div className="modal-body p-0">
          <Card className="bg-white border-0 mb-0">
            <CardHeader className="bg-transparent pb-2 modal-header">
              <h2 className="mb-0">
                {isModalAdd ? "Thêm tài khoản" : "Cập nhật tài khoản"}
              </h2>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => setFormModal(false)}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </CardHeader>
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
                  <>
                    <CardBody className="px-lg-5 py-lg-3">
                      <Form className="needs-validation" noValidate>
                        <div className="form-row">
                          <Col className="" md="6">
                            <InputCustom
                              className="max-height-input-custom"
                              label="Họ tên"
                              required={<RequireCustom />}
                              placeholder="Nhập tên người dùng"
                              type="text"
                              id="name"
                              name="name"
                              invalid={errors.name && touched.name}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue("name", e.target.value);
                              }}
                              messageInvalid={errors.name}
                              value={values.name}
                            />
                          </Col>
                          <Col className="" md="6">
                            <FormGroup className="mb-0">
                              <label
                                className="form-control-label"
                                htmlFor="gender"
                              >
                                Giới tính
                              </label>
                              <Input
                                value={values.gender}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  setFieldValue("gender", e.target.value);
                                }}
                                id="gender"
                                name="gender"
                                type="select"
                                style={{
                                  paddingTop: 0,
                                  paddingBottom: 0,
                                  height: 36,
                                }}
                              >
                                <option value="Nữ">Nữ</option>
                                <option value="Nam">Nam</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col className="mt-3" md="6">
                            <InputCustom
                              className="max-height-input-custom"
                              disabled={!isModalAdd}
                              label="Email"
                              required={<RequireCustom />}
                              placeholder="Nhập email"
                              type="text"
                              id="email"
                              name="email"
                              invalid={errors.email && touched.email}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue("email", e.target.value);
                              }}
                              messageInvalid={errors.email}
                              value={values.email}
                            />
                          </Col>
                          <Col className="mt-3" md="6">
                            <FormGroup className="mb-0">
                              <label
                                className="form-control-label"
                                htmlFor="roleId"
                              >
                                Nhóm quyền
                                <RequireCustom />
                              </label>
                              <Select
                                placeholder="Lựa chọn"
                                value={roleValue}
                                isClearable={true}
                                onChange={(e) => {
                                  setRoleValue(e);
                                  setFieldValue("roleId", !!e ? e.value : "");
                                }}
                                options={roles.results.map((item) => ({
                                  label: item.name,
                                  value: item.id,
                                }))}
                                onInputChange={(value) => {
                                  setRoleSearch(value);
                                }}
                                onFocus={() => {
                                  setFocused({
                                    ...focused,
                                    roleId: true,
                                  });
                                }}
                              />
                              {errors.roleId && focused.roleId && (
                                <Error messageInvalid={errors.roleId} />
                              )}
                            </FormGroup>
                          </Col>
                          <Col className="mt-3" md="12">
                            <InputCustom
                              label="Địa chỉ"
                              // required={<RequireCustom />}
                              placeholder="Nhập địa chỉ"
                              rows="3"
                              type="textarea"
                              id="address"
                              name="address"
                              invalid={errors.address && touched.address}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue("address", e.target.value);
                              }}
                              messageInvalid={errors.address}
                              value={values.address}
                            />
                          </Col>
                          {!isModalAdd && (
                            <Col className="mt-3" md="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="status"
                                >
                                  Trạng thái
                                </label>
                                <Input
                                  defaultValue={1}
                                  value={values.status}
                                  onBlur={handleBlur}
                                  onChange={(e) => {
                                    setFieldValue("status", e.target.value);
                                  }}
                                  id="status"
                                  name="status"
                                  type="select"
                                  style={{
                                    paddingTop: 0,
                                    paddingBottom: 0,
                                    height: 36,
                                  }}
                                >
                                  <option value="active">Hoạt động</option>
                                  <option value="lock">Khóa</option>
                                  <option value="delete">Xóa</option>
                                </Input>
                              </FormGroup>
                            </Col>
                          )}
                        </div>
                      </Form>
                    </CardBody>
                    <div className="px-lg-5 py-lg-3 d-flex justify-content-end">
                      <Button
                        onClick={() => {
                          if (!isCreateAccount && !isUpdateAccount) {
                            resetForm();
                            setFormModal(false);
                          }
                        }}
                        color=""
                        size="md"
                        type="button"
                      >
                        Hủy
                      </Button>
                      <LoadingButtonCustom
                        loading={isCreateAccount || isUpdateAccount}
                        onClick={() => {
                          setFocused({
                            roleId: true,
                          });
                          handleSubmit();
                        }}
                        color="primary"
                        size="md"
                        type="button"
                      >
                        {isModalAdd ? "Thêm mới" : "Lưu lại"}
                      </LoadingButtonCustom>
                      {/* <Button
                onClick={handleSubmit}
                color="primary"
                size="md"
                type="button"
              >
                {isModalAdd ? "Thêm mới" : "Lưu lại"}
              </Button> */}
                    </div>
                  </>
                );
              }}
            </Formik>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default FormAccount;
