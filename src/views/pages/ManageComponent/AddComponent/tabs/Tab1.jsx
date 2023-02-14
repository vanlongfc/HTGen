import React, { useState, useEffect, useRef } from "react";
import { AddSVG, BinSVG } from "assets/svg";
import { Button, Col, FormGroup, Row } from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import Select from "react-select";
import { accountActions } from "Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import moment from "moment";
import ReactNotificationAlert from "react-notification-alert";
import { notify } from "common";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import Error from "views/pages/components/Error";
import RequireCustom from "views/pages/components/RequireCustom";
import _ from "lodash";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const options = [
  { value: "value 1", label: "label 1" },
  { value: "value 2", label: "label 2" },
  { value: "value 3", label: "label 3" },
];

const OrderInfor = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const notificationAlertRef = useRef(null);
  const orderSchema = yup.object().shape({
    component1: yup.string().required("Vui lòng nhập ...!"),
    component2: yup.string().required("Vui lòng chọn ...!"),
  });

  const [component5, setComponent5] = useState([]);
  const { accounts } = useSelector((state) => state.accountReducer);
  const [component2Value, setComponent2Value] = useState(null);
  const [accountSearch, setAccountSearch] = useState("");
  const [componentInfo, setComponentInfo] = useState({
    component1: "",
    component2: "",
    component4: [
      {
        componentValue: null,
        componentId: "",
        component41: 0,
        component42: 0,
      },
    ],
    component5: [],
    date: new Date(),
  });
  const [focused, setFocused] = useState({
    component2: false,
    component5: false,
  });
  const handleGetAccounts = () => {
    if (accountSearch === "") {
      dispatch(
        accountActions.getAccounts(queryString.stringify({ status: "active" }))
      );
    } else {
      dispatch(
        accountActions.getAccounts(
          queryString.stringify({ status: "active", name: accountSearch })
        )
      );
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleGetAccounts();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [accountSearch]);

  const clearData = () => {
    setComponentInfo({
      component1: "",
      component2: "",
      component4: [
        {
          componentValue: null,
          componentId: "",
          component41: 0,
          component42: 0,
        },
      ],
      component5: [],
      date: new Date(),
    });
  };

  const onSubmit = (values, actions) => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      <Formik
        initialValues={componentInfo}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={orderSchema}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
          errors,
          touched,
          resetForm,
          handleBlur,
          onChange,
        }) => {
          return (
            <>
              <Row>
                <Col xs={7} style={{ borderRight: "1px solid #BABCBE" }}>
                  <Row>
                    <Col xs={3} className="h4 font-weight-400 ">
                      <label className="form-control-label">
                        Component 1
                        <RequireCustom />
                      </label>
                    </Col>
                    <Col xs={9}>
                      <FormGroup className="mb-3">
                        <InputCustom
                          className="max-height-input-custom"
                          // style={{ maxWidth: 300 }}
                          placeholder="Nhập ..."
                          type="text"
                          name="component1"
                          id="component1"
                          onBlur={handleBlur}
                          invalid={touched.component1 && errors.component1}
                          onChange={onChange}
                          messageInvalid={errors?.component1}
                          value={values.component1}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col
                      style={{ whiteSpace: "nowrap" }}
                      xs={3}
                      className="h4 font-weight-400"
                    >
                      <label className="form-control-label">
                        Component 2
                        <RequireCustom />
                      </label>
                    </Col>
                    <Col xs={9}>
                      <Select
                        placeholder="Nhập tên tìm kiếm"
                        isClearable={true}
                        value={component2Value}
                        onChange={(e) => {
                          setComponent2Value(e);
                          setFieldValue("component2", e ? e.value : "");
                        }}
                        options={accounts.results.map((item) => ({
                          label: item.name,
                          value: item.id,
                        }))}
                        onInputChange={(value) => {
                          setAccountSearch(value);
                        }}
                        onFocus={() => {
                          setFocused({
                            ...focused,
                            component2: true,
                          });
                        }}
                      />
                      {focused.component2 && errors.component2 && (
                        <Error messageInvalid={errors.component2} />
                      )}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={3} className="h4 font-weight-400">
                      <label className="form-control-label">Component 3</label>
                    </Col>
                    <Col md={9}>
                      <FormGroup className="mb-3">
                        <InputCustom
                          placeholder="Nhập ghi chú"
                          type="textarea"
                          rows="4"
                          name="component3"
                          id="component3"
                          onBlur={handleBlur}
                          invalid={errors.component3 && touched.component3}
                          onChange={onChange}
                          messageInvalid={errors.component3}
                          value={values.component3}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={3} className="h3 text-sm font-weight-500">
                      Liệt kê ...
                      <RequireCustom />
                    </Col>
                    <Col xs={9}>
                      <Select
                        isClearable={false}
                        value={component5}
                        placeholder="Chọn ..."
                        className="select-muti"
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        onChange={(e, remove) => {
                          if (_.isEmpty(remove?.removedValue)) {
                            setComponent5([...e]);
                            setFieldValue("component5", [
                              ...e.map((item) => item.value),
                            ]);
                          } else {
                            const tempComponent5 = component5.filter(
                              (item) => item.value !== remove.removedValue.value
                            );
                            setComponent5(tempComponent5);
                            const tempComponent5Value =
                              values.component5.filter(
                                (item) => item !== remove.removedValue.value
                              );

                            setFieldValue("component5", tempComponent5Value);
                          }
                        }}
                        options={options}
                        onInputChange={(value) => {}}
                        onFocus={() => {
                          setFocused({
                            ...focused,
                            component5: true,
                          });
                        }}
                      />
                      {values.component5.length === 0 && focused.component5 && (
                        <Error messageInvalid={"Vui lòng chọn ...!"} />
                      )}
                    </Col>
                  </Row>
                  {values.component4.map((item, index) => {
                    return (
                      <Row>
                        <Col md={12}>
                          <Row>
                            <Col xs={5}>
                              <label className="form-control-label">
                                Chọn ...
                                <RequireCustom />
                              </label>
                              <Select
                                placeholder="Lựa chọn"
                                isClearable={true}
                                value={item.component42}
                                onChange={(e) => {
                                  setFieldValue("component4", [
                                    ...values.component4.slice(0, index),
                                    {
                                      ...values.component4[index],
                                      component41: !!e ? e.value : "",
                                      component42: e,
                                    },
                                    ...values.component4.slice(index + 1),
                                  ]);
                                }}
                                options={options}
                                onInputChange={(value) => {}}
                              />
                            </Col>
                            <Col xs={3}>
                              <Row
                                className="mx-0 "
                                style={{ justifyContent: "flex-end" }}
                              >
                                <FormGroup className="mb-3">
                                  <InputCustom
                                    className="max-height-input-custom"
                                    placeholder="Nhập"
                                    label="..."
                                    type="number"
                                    onChange={(e) => {
                                      setFieldValue("component4", [
                                        ...values.component4.slice(0, index),
                                        {
                                          ...values.component4[index],
                                          component41:
                                            e.target.value === ""
                                              ? ""
                                              : Number(e.target.value) < 0
                                              ? ""
                                              : Number(e.target.value),
                                        },
                                        ...values.component4.slice(index + 1),
                                      ]);
                                    }}
                                    value={item.component41}
                                    style={{ maxWidth: 80 }}
                                  />
                                </FormGroup>
                              </Row>
                            </Col>
                            <Col xs={3}>
                              <Row
                                className="mx-0 "
                                style={{
                                  justifyContent: "flex-end",
                                  alignItems: "center",
                                }}
                              >
                                <FormGroup className="mb-3">
                                  <InputCustom
                                    className="max-height-input-custom"
                                    placeholder="Nhập"
                                    label="..."
                                    required={<RequireCustom />}
                                    type="number"
                                    invalid={
                                      item.component42 < 0 ||
                                      item.component42 === ""
                                    }
                                    onChange={(e) => {
                                      setFieldValue("component4", [
                                        ...values.component4.slice(0, index),
                                        {
                                          ...values.component4[index],
                                          component42:
                                            e.target.value === ""
                                              ? ""
                                              : Number(e.target.value) < 0
                                              ? ""
                                              : Number(e.target.value),
                                        },
                                        ...values.component4.slice(index + 1),
                                      ]);
                                    }}
                                    value={item.component42}
                                    style={{ maxWidth: 80 }}
                                  />
                                </FormGroup>
                              </Row>
                            </Col>
                            <Col
                              className="d-flex align-items-center justify-content-end"
                              xs={1}
                            >
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setFieldValue("component4", [
                                    ...values.component4.slice(0, index),
                                    ...values.component4.slice(index + 1),
                                  ]);
                                }}
                              >
                                {values.component4.length !== 1 && <BinSVG />}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    );
                  })}
                  <Row className="pr-3" style={{ justifyContent: "flex-end" }}>
                    <span
                      onClick={() => {
                        setFieldValue("component4", [
                          ...values.component4,
                          {
                            componentValue: null,
                            componentId: "",
                            component41: 0,
                            component42: 0,
                          },
                        ]);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <AddSVG />
                    </span>
                    <Col md="12">
                      {/* {errorProducts && (
                        <Error messageInvalid="Vui lòng nhập đầy đủ thông tin ...!" />
                      )} */}
                    </Col>
                  </Row>
                </Col>
                <Col xs={5}>
                  <p className=" h5 text-muted text-uppercase">Thời gian</p>
                  <Row className="mb-3">
                    <Col xs={6}>
                      <label className="form-control-label">
                        Thời gian ...
                      </label>
                      <InputCustom
                        type="date"
                        value={moment(values.date).format("YYYY-MM-DD")}
                        onChange={onChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="text-md-right mt-3">
                <Button
                  onClick={() => {
                    clearData();
                    resetForm();
                  }}
                >
                  Hủy bỏ
                </Button>
                <Button
                  onClick={() => {
                    setFocused({
                      component2: true,
                      component5: true,
                    });
                    handleSubmit();
                  }}
                  color="primary"
                >
                  Lưu và Tiếp tục
                </Button>
              </div>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default OrderInfor;
