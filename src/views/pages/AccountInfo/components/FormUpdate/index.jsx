import React, { useEffect, useState } from "react";
import {
  Modal,
  Card,
  CardHeader,
  CardBody,
  Form,
  Col,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import { useSelector, useDispatch } from "react-redux";
import { accountActions } from "Redux/Actions";
import { Formik } from "formik";
import * as yup from "yup";
import RequireCustom from "views/pages/components/RequireCustom";
import { notify } from "common";
import queryString from "query-string";

const FormUpdate = ({ formModal, setFormModal, notificationAlertRef }) => {
  const { currentAccount } = useSelector((state) => state.accountReducer);
  const { roles } = useSelector((state) => state.roleReducer);
  const dispatch = useDispatch();

  const accountSchema = yup.object().shape({
    name: yup.string().required("Tên không được để trống!"),
  });

  const [accountInfo, setAccountInfo] = useState({
    address: "",
    email: "",
    name: "",
    gender: "Nữ",
    roleId: "",
    status: "active",
  });

  const onSubmit = (values, actions) => {
    dispatch(
      accountActions.updateAccount(
        localStorage.getItem("id"),
        {
          name: values.name,
          roleId: values.roleId,
          gender: values.gender,
          email: values.email,
          address: values.address,
          status: values.status,
        },
        {
          success: () => {
            notify(
              notificationAlertRef,
              "success",
              "Thông báo",
              `Cập nhật thông tin tài khoản ${values.email} thành công!`
            );
            clearData();
            actions.resetForm();
            handleGetCurrentAccount();
            setFormModal(false);
          },
          failed: (mess) => {
            notify(
              notificationAlertRef,
              "danger",
              "Thông báo",
              `Cập nhật thông tin tài khoản ${values.email} thất bại. Lỗi: ${mess}!`
            );
          },
        }
      )
    );
  };

  const handleGetCurrentAccount = () => {
    dispatch(
      accountActions.getCurrentAccount(
        localStorage.getItem("id"),
        queryString.stringify({ populate: "roleId" })
      )
    );
  };

  useEffect(() => {
    setAccountInfo({
      address: currentAccount?.address,
      email: currentAccount?.email,
      gender: currentAccount?.gender,
      name: currentAccount?.name,
      roleId: currentAccount?.roleId?.id,
      status: currentAccount?.status,
    });
  }, [currentAccount]);

  const clearData = () => {
    setAccountInfo({
      name: "",
      email: "",
      gender: "Nữ",
      roleId: "",
      status: "active",
    });
  };

  return (
    <Modal
      className="modal-dialog-centered"
      size="lg"
      isOpen={formModal}
      toggle={() => setFormModal(false)}
    >
      <div className="modal-body p-0">
        <Card className="bg-white border-0 mb-0">
          <CardHeader className="bg-transparent pb-2 modal-header">
            <h2 className="mb-0">Cập nhật thông tin cá nhân</h2>
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
                        <Col className="mb-2" md="6">
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
                        <Col className="mb-2" md="6">
                          <FormGroup className="mb-0">
                            <label className="form-control-label">
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
                        <Col className="mb-2" md="6">
                          <InputCustom
                            className="max-height-input-custom"
                            disabled={true}
                            label="Email"
                            type="text"
                            id="email"
                            value={values.email}
                          />
                        </Col>
                        <Col className="mb-2" md="6">
                          <InputCustom
                            className="max-height-input-custom"
                            disabled={true}
                            label="Nhóm quyền"
                            type="text"
                            id="role"
                            value={currentAccount.roleId.name}
                          />
                        </Col>
                        <Col className="mb-2" md="12">
                          <InputCustom
                            label="Địa chỉ"
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
                      </div>
                    </Form>
                  </CardBody>
                  <div className="px-lg-5 py-lg-3 d-flex justify-content-end">
                    <Button
                      onClick={() => {
                        setFormModal(false);
                      }}
                      color=""
                      size="md"
                      type="button"
                    >
                      Hủy
                    </Button>
                    <Button
                      onClick={() => {
                        handleSubmit();
                      }}
                      color="primary"
                      size="md"
                      type="button"
                    >
                      Lưu lại
                    </Button>
                  </div>
                </>
              );
            }}
          </Formik>
        </Card>
      </div>
    </Modal>
  );
};

export default FormUpdate;
