import React, { useEffect, useRef, useState } from "react";
import { GET } from "Services/ServiceBase";
import {
  Container,
  Row,
  Col,
  Card,
  Input,
  FormGroup,
  DropdownItem,
  Button,
  CardBody,
  Form,
  CardHeader,
  Modal,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";
import { useSelector, useDispatch } from "react-redux";
import { customerActions } from "Redux/Actions";
import Select from "react-select";
import { provincesActions } from "Redux/Actions";
import queryString from "query-string";
import * as yup from "yup";
import { Formik } from "formik";
import _ from "lodash";
import Error from "views/pages/components/Error";
import RequireCustom from "views/pages/components/RequireCustom";
const FormCustomer = ({
  formModal,
  dataFormModal,
  isModalAdd,
  setFormModal,
  notificationAlertRef,
  notify,
  handleGet,
}) => {
  const schema = yup.object().shape({});

  const { isAddCustomer, customers } = useSelector(
    (state) => state.customerReducer
  );
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    code: "",
    address: "",
    contactPerson: "",
    parentId: "",
    provinceId: "",
    phone: "",
  });

  const handleUpdate = (values, actions) => {};
  const handleCreate = (values, actions) => {};
  const onSubmit = (values, actions) => {};

  useEffect(() => {
    if (!_.isEmpty(dataFormModal)) {
    }
  }, [dataFormModal]);

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
                {isModalAdd ? "Thêm mới ..." : "Cập nhật thông tin ..."}
              </h2>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => {
                  setFormModal(false);
                }}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </CardHeader>
            <Formik
              initialValues={data}
              enableReinitialize
              onSubmit={onSubmit}
              validationSchema={schema}
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
                  <CardBody className="px-lg-5 py-lg-3">
                    <Form className="needs-validation" noValidate>
                      <Row className="d-flex justify-content-center">
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
                        <LoadingButtonCustom
                          loading={false}
                          onClick={() => {
                            handleSubmit();
                          }}
                          color="primary"
                          size="md"
                          type="button"
                        >
                          {isModalAdd ? "Thêm mới" : "Lưu lại"}
                        </LoadingButtonCustom>
                      </Row>
                    </Form>
                  </CardBody>
                );
              }}
            </Formik>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default FormCustomer;
