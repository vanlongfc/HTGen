import React, { useState, useEffect, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Input,
} from "reactstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import SimpleHeader from "./components/Header";
import ModalWarningCustom from "views/pages/components/ModalWarningCustom";
import { EditSVG, DeleteSVG } from "assets/svg";
import Autosuggest from "react-autosuggest";
import { useDispatch, useSelector } from "react-redux";
import { customerActions } from "Redux/Actions";
import queryString from "query-string";
import _ from "lodash";
import { notify, checkRole } from "common";
import NotificationAlert from "react-notification-alert";
import InputCustom from "views/pages/components/InputCustom";
import Form from "./Form";
import ReactNotificationAlert from "react-notification-alert";
import moment from "moment";
const data = {
  results: [
    {
      id: "column0",
      column1: "column1",
      column2: "column2",
      column3: "column3",
      column4: new Date(),
    },
  ],
  totalResults: 1,
};

const CustomerManage = () => {
  const notificationAlertRef = useRef(null);
  const dispatch = useDispatch();
  const { isDeleteCustomer } = useSelector((state) => state.customerReducer);
  const { currentAccount } = useSelector((state) => state.accountReducer);
  const [roleManage, setRoleManage] = useState(true);
  const [roleDelete, setRoleDelete] = useState(true);
  const [customerSearch, setCustomerSearch] = useState("");
  const [formModal, setFormModal] = useState(false);
  const [dataFormModal, setDataFormModal] = useState({});
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
  });

  const boxAction = (cell, row, id, formatExtraData) => {
    return (
      <>
        <button
          style={{
            padding: 0,
            border: "none",
            marginRight: ".5rem",
            background: "none",
          }}
          id={"edit" + id}
          onClick={() => {
            setFormModal(true);
            setIsModalAdd(false);
          }}
        >
          <EditSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target={"edit" + id}>
          Cập nhật thông tin ...
        </UncontrolledTooltip>

        <button
          id={"delete" + id}
          onClick={() => {
            setNotificationModal(true);
          }}
          style={{ padding: 0, border: "none", background: "none" }}
        >
          <DeleteSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target={"delete" + id}>
          Xóa khách hàng
        </UncontrolledTooltip>
      </>
    );
  };
  const [columns, setColumns] = useState([
    {
      dataField: "column1",
      text: "column1",
      style: {
        textAlign: "left",
      },
      headerStyle: {
        width: 250,
      },
    },
    {
      dataField: "column2",
      text: "column2",
      style: {
        textAlign: "left",
      },
      headerStyle: {
        width: 250,
      },
    },
    {
      dataField: "column3",
      text: "column3",
      style: {
        textAlign: "left",
      },
      headerStyle: {
        width: 250,
      },
    },
    {
      dataField: "column4",
      text: "column4",
      formatter: (cell) => {
        return (
          <p className="mb-0 text-md-center h5 font-weight-400">
            {moment(new Date(cell)).format("DD/MM/YYYY")}
          </p>
        );
      },
      headerStyle: { textAlign: "center" },
    },
    {
      dataField: "actions",
      text: "Hành động",
      formatter: boxAction,
      style: { textAlign: "center" },
      headerStyle: { textAlign: "center" },
    },
  ]);

  const onSizePerPageChange = (value) => {
    setRowsPerPage(value);
    setPage(1);
    setQuery({ ...query, page: 1, limit: value });
  };

  const pagination = paginationFactory({
    page: page,
    onPageChange: (value) => {
      setPage(value);
      setQuery({ ...query, page: value });
    },
    sizePerPage: rowsPerPage,
    totalSize: data?.totalResults,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > data.results.length
              ? !isNaN(data?.totalResults)
                ? data.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số {!isNaN(data?.totalResults) ? data.totalResults : 0} bản
            ghi
          </p>
        </Col>
      </>
    ),
  });

  const handleDelete = () => {};

  useEffect(() => {}, [currentAccount]);

  useEffect(() => {
    if (!roleManage && !roleDelete) {
      const index = columns.findIndex((item) => item.dataField === "actions");
      if (index !== -1)
        setColumns([...columns.slice(0, index), ...columns.slice(index + 1)]);
    } else {
      setColumns([
        {
          dataField: "column1",
          text: "column1",
          style: {
            textAlign: "left",
          },
          headerStyle: {
            width: 250,
          },
        },
        {
          dataField: "column2",
          text: "column2",
          style: {
            textAlign: "left",
          },
          headerStyle: {
            width: 250,
          },
        },
        {
          dataField: "column3",
          text: "column3",
          style: {
            textAlign: "left",
          },
          headerStyle: {
            width: 250,
          },
        },
        {
          dataField: "column4",
          text: "column4",
          formatter: (cell) => {
            return (
              <p className="mb-0 text-md-center h5 font-weight-400">
                {moment(new Date(cell)).format("DD/MM/YYYY")}
              </p>
            );
          },
          headerStyle: { textAlign: "center" },
        },
        {
          dataField: "actions",
          text: "Hành động",
          formatter: boxAction,
          style: { textAlign: "center" },
          headerStyle: { textAlign: "center" },
        },
      ]);
    }
  }, [roleManage, roleDelete]);

  return (
    <>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      {formModal && (
        <Form
          handleGet={() => {}}
          isModalAdd={isModalAdd}
          formModal={formModal}
          setFormModal={setFormModal}
          dataFormModal={dataFormModal}
          notify={notify}
          notificationAlertRef={notificationAlertRef}
        />
      )}
      {notificationModal && (
        <ModalWarningCustom
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          name="khách hàng"
          func={handleDelete}
        />
      )}
      <SimpleHeader
        name=""
        parentName="Quản lý"
        setFormModal={setFormModal}
        setIsModalAdd={setIsModalAdd}
        roleManage={roleManage}
      />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <ToolkitProvider
                data={data.results}
                keyField="id"
                columns={columns}
                search
              >
                {(props) => (
                  <>
                    <Row>
                      <Col>
                        <CardHeader>
                          <h3 className="mb-0">Danh sách ...</h3>
                        </CardHeader>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <CardHeader>
                          <div className="mb-0 d-flex align-items-center">
                            <p className="mb-0">Hiển thị </p>
                            {
                              <select
                                value={rowsPerPage}
                                name="datatable-basic_length"
                                aria-controls="datatable-basic"
                                className="form-control form-control-sm mx-2"
                                style={{ maxWidth: 60 }}
                                onChange={(e) =>
                                  onSizePerPageChange(e.target.value)
                                }
                              >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>
                            }{" "}
                            <p className="mb-0">dòng</p>
                          </div>
                        </CardHeader>
                      </Col>
                      <Col className="d-flex align-items-center mr-4 justify-content-end">
                        <Row style={{ width: "100%" }}>
                          <Col
                            md={6}
                            className="d-flex align-items-center justify-content-end"
                          >
                            <h4 className="mb-0">Tìm kiếm tên ...</h4>
                          </Col>
                          <Col md={6} className="d-flex align-items-center">
                            <Input
                              id="search-by-name"
                              placeholder="Nhập tên"
                              type="text"
                              onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                  setPage(1);
                                  setQuery({ ...query, page: 1 });
                                }
                              }}
                              value={customerSearch}
                              onChange={(e) => {
                                setCustomerSearch(e.target.value);
                              }}
                              className="py-0"
                              bsSize="sm"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <BootstrapTable
                      {...props.baseProps}
                      noDataIndication={() => {
                        return (
                          <span className="font-weight-bold text-danger">
                            Không có dữ liệu!
                          </span>
                        );
                      }}
                      onTableChange={() => {
                        return <div className="spinner-border text-info" />;
                      }}
                      hover
                      remote
                      filter={filterFactory()}
                      bootstrap4={true}
                      pagination={pagination}
                      bordered={false}
                    />
                  </>
                )}
              </ToolkitProvider>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CustomerManage;
