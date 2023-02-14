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
import { accountActions } from "Redux/Actions";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "common";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import { Formik } from "formik";
import * as yup from "yup";

const FormAccount = ({
  formModalChangePassword,
  setFormModalChangePassword,
  account,
  notificationAlertRef,
}) => {
  const { isConfigPasswordAccount } = useSelector(
    (state) => state.accountReducer
  );

  const [passwords, setPasswords] = React.useState({
    newPassword: "",
    newPasswordRetype: "",
  });

  const passwordSchema = yup.object().shape({
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
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    // dispatch(
    //   accountActions.configPasswordAccount(
    //     { userId: account.id, password: values.newPassword },
    //     {
    //       success: () => {
    //         notify(
    //           notificationAlertRef,
    //           "success",
    //           "Thông báo",
    //           `Thiết lập mật khẩu tài khoản ${account.email} thành công!`
    //         );
    //         setFormModalChangePassword(false);
    //       },
    //       failed: (mess) => {
    //         notify(
    //           notificationAlertRef,
    //           "danger",
    //           "Thông báo",
    //           `Thiết lập mật khẩu tài khoản ${account.email} thất bại. Lỗi: ${mess}!`
    //         );
    //       },
    //     }
    //   )
    // );
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        size="md"
        isOpen={formModalChangePassword}
        toggle={() =>
          !isConfigPasswordAccount && setFormModalChangePassword(false)
        }
      >
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
              <div className="modal-body p-0">
                <Card className="bg-white border-0 mb-0">
                  <CardHeader className="bg-transparent pb-2 modal-header">
                    <h2 className="mb-0">Thiết lập mật khẩu</h2>
                    <button
                      aria-label="Close"
                      className="close"
                      data-dismiss="modal"
                      type="button"
                      onClick={() =>
                        !isConfigPasswordAccount &&
                        setFormModalChangePassword(false)
                      }
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-3">
                    <Form
                      className="needs-validation d-flex justify-content-center"
                      noValidate
                    >
                      <div style={{ minWidth: 300 }}>
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
                          onChange={(e) => {
                            setFieldValue("newPassword", e.target.value.trim());
                          }}
                          messageInvalid={
                            errors.newPassword && touched.newPassword
                              ? errors.newPassword
                              : ""
                          }
                          style={{ maxWidth: 300 }}
                          value={values.newPassword}
                        />
                        <InputCustom
                          className="max-height-input-custom"
                          label="Xác nhận mật khẩu"
                          required={<RequireCustom />}
                          placeholder="Vui lòng nhập lại mật khẩu mới"
                          type="password"
                          id="newPasswordRetype"
                          name="newPasswordRetype"
                          onBlur={handleBlur}
                          invalid={
                            errors.newPasswordRetype &&
                            touched.newPasswordRetype
                          }
                          onChange={(e) => {
                            setFieldValue(
                              "newPasswordRetype",
                              e.target.value.trim()
                            );
                          }}
                          messageInvalid={
                            errors.newPasswordRetype &&
                            touched.newPasswordRetype
                              ? errors.newPasswordRetype
                              : ""
                          }
                          value={values.newPasswordRetype}
                          style={{ maxWidth: 300 }}
                        />
                      </div>
                    </Form>
                  </CardBody>
                  <div className="px-lg-5 py-lg-3 d-flex justify-content-end align-items-center">
                    <Button
                      onClick={() => {
                        !isConfigPasswordAccount &&
                          setFormModalChangePassword(false);
                      }}
                      color=""
                      size="md"
                      type="button"
                    >
                      Hủy
                    </Button>
                    <LoadingButtonCustom
                      loading={isConfigPasswordAccount}
                      onClick={handleSubmit}
                      color="primary"
                      type="button"
                      outline={false}
                      block={false}
                    >
                      Lưu lại
                    </LoadingButtonCustom>
                  </div>
                </Card>
              </div>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default FormAccount;
