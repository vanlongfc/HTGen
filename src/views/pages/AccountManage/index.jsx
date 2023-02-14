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
import FormAccount from "./FormAccount";
import FormChangePassword from "./FormChangePassword";
import { EditSVG, DeleteSVG, KeySVG } from "assets/svg";
import Autosuggest from "react-autosuggest";
import { useDispatch, useSelector } from "react-redux";
import { accountActions } from "Redux/Actions";
import queryString from "query-string";
import _ from "lodash";
import { notify, checkRole } from "common";
import NotificationAlert from "react-notification-alert";

const data = {
  results: [
    {
      id: "1",
      name: "name",
      roleId: {
        name: "role",
      },
      email: "email",
      address: "address",
      status: "status",
    },
  ],
  totalResults: 1,
};

const AccountManage = () => {
  const dispatch = useDispatch();
  const { accounts, isDeleteAccount, isGetAccounts, currentAccount } =
    useSelector((state) => state.accountReducer);

  const notificationAlertRef = useRef(null);
  const [notificationModal, setNotificationModal] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [formModalChangePassword, setFormModalChangePassword] = useState(false);
  const [accountSearch, setAccountSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roleManage, setRoleManage] = useState(false);
  const [roleDelete, setRoleDelete] = useState(false);
  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
    populate: "roleId",
  });
  const [account, setAccount] = useState({});
  const handleGetAccounts = () => {
    if (accountSearch === "") {
      dispatch(accountActions.getAccounts(queryString.stringify(query)));
    } else {
      dispatch(
        accountActions.getAccounts(
          queryString.stringify({ ...query, name: accountSearch })
        )
      );
    }
  };
  useEffect(() => {
    // handleGetAccounts();
  }, [query]);

  const handleDelete = () => {
    // dispatch(
    //   accountActions.deleteAccount(account.id, {
    //     success: () => {
    //       setNotificationModal(false);
    //       notify(
    //         notificationAlertRef,
    //         "success",
    //         "Thông báo",
    //         `Xóa tài khoản ${account.email} thành công!`
    //       );
    //       handleGetAccounts();
    //     },
    //     failed: () => {
    //       notify(
    //         notificationAlertRef,
    //         "danger",
    //         "Thông báo",
    //         `Xóa tài khoản ${account.email} thất bại!`
    //       );
    //     },
    //   })
    // );
  };

  const boxAction = (cell, row, id, formatExtraData) => {
    return (
      <>
        {roleManage && (
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
                setAccount(row);
                setFormModal(true);
                setIsModalAdd(false);
              }}
            >
              <EditSVG />
            </button>
            <UncontrolledTooltip delay={1} placement="top" target={"edit" + id}>
              Cập nhật thông tin tài khoản
            </UncontrolledTooltip>
            <button
              style={{
                padding: 0,
                border: "none",
                marginRight: ".5rem",
                background: "none",
              }}
              id={"key" + id}
              onClick={() => {
                setAccount(row);
                setFormModalChangePassword(true);
              }}
            >
              <KeySVG />
            </button>
            <UncontrolledTooltip delay={1} placement="top" target={"key" + id}>
              Thiết lập mật khẩu
            </UncontrolledTooltip>
          </>
        )}
        {roleDelete && (
          <>
            <button
              onClick={() => {
                setAccount(row);
                setNotificationModal(true);
              }}
              id={"delete" + id}
              style={{ padding: 0, border: "none", background: "none" }}
            >
              <DeleteSVG />
            </button>
            <UncontrolledTooltip
              delay={1}
              placement="top"
              target={"delete" + id}
            >
              Xóa tài khoản
            </UncontrolledTooltip>
          </>
        )}
      </>
    );
  };
  const [columns, setColumns] = useState([
    {
      dataField: "name",
      text: "Tên tài khoản",
      style: {
        textAlign: "left",
      },
      headerStyle: {
        textAlign: "left",
      },
    },
    {
      dataField: "roleId.name",
      text: "Nhóm quyền",
      style: {
        textAlign: "left",
      },
      headerStyle: {
        textAlign: "left",
      },
    },
    {
      dataField: "email",
      text: "Email",
      style: {
        textAlign: "left",
      },
      headerStyle: {
        textAlign: "left",
      },
    },
    {
      dataField: "address",
      text: "Địa chỉ",
      style: {
        textAlign: "left",
      },
      headerStyle: {
        textAlign: "left",
      },
    },
    {
      dataField: "status",
      text: "Trạng thái",
    },
    {
      dataField: "actions",
      text: "Hành động",
      formatter: boxAction,
      headerStyle: {
        textAlign: "center",
      },
      style: { textAlign: "center" },
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
    totalSize: !isNaN(data?.totalResults) ? data.totalResults : 0,
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

  useEffect(() => {
    if (!_.isEmpty(currentAccount)) {
      if (checkRole(currentAccount, { roles: ["manage_user"] })) {
        setRoleManage(true);
      }
      if (checkRole(currentAccount, { roles: ["delete_user"] })) {
        setRoleDelete(true);
      }
    }
  }, [currentAccount]);

  useEffect(() => {
    if (!roleManage && !roleDelete) {
      const index = columns.findIndex((item) => item.dataField === "actions");
      if (index !== -1)
        setColumns([...columns.slice(0, index), ...columns.slice(index + 1)]);
    } else {
      setColumns([
        {
          dataField: "name",
          text: "Tên tài khoản",
          style: {
            textAlign: "left",
          },
          headerStyle: {
            textAlign: "left",
          },
        },
        {
          dataField: "roleId.name",
          text: "Nhóm quyền",
          style: {
            textAlign: "left",
          },
          headerStyle: {
            textAlign: "left",
          },
        },
        {
          dataField: "email",
          text: "Email",
          style: {
            textAlign: "left",
          },
          headerStyle: {
            textAlign: "left",
          },
        },
        {
          dataField: "address",
          text: "Địa chỉ",
          style: {
            textAlign: "left",
          },
          headerStyle: {
            textAlign: "left",
          },
        },
        {
          dataField: "status",
          text: "Trạng thái",
        },
        {
          dataField: "actions",
          text: "Hành động",
          formatter: boxAction,
          style: { textAlign: "center" },
          headerStyle: {
            textAlign: "center",
          },
        },
      ]);
    }
  }, [roleManage, roleDelete]);

  return (
    <>
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      {notificationModal && (
        <ModalWarningCustom
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          name="tài khoản"
          func={handleDelete}
          isDelete={isDeleteAccount}
        />
      )}
      {formModal && (
        <FormAccount
          isModalAdd={isModalAdd}
          formModal={formModal}
          setFormModal={setFormModal}
          notificationAlertRef={notificationAlertRef}
          account={account}
          handleGetAccounts={handleGetAccounts}
        />
      )}
      {formModalChangePassword && (
        <FormChangePassword
          account={account}
          formModalChangePassword={formModalChangePassword}
          setFormModalChangePassword={setFormModalChangePassword}
          notificationAlertRef={notificationAlertRef}
        />
      )}
      <SimpleHeader
        roleManage={roleManage}
        setFormModal={setFormModal}
        setIsModalAdd={setIsModalAdd}
        name=""
        parentName="Quản lý"
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
                          <h3 className="mb-0">Danh sách tài khoản</h3>
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
                            <h4 className="mb-0">Tìm kiếm tên tài khoản</h4>
                          </Col>
                          <Col md={6} className="d-flex align-items-center">
                            <Input
                              id="search-by-name"
                              placeholder="Nhập tên"
                              type="text"
                              onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                  handleGetAccounts();
                                }
                              }}
                              value={accountSearch}
                              onChange={(e) => {
                                setAccountSearch(e.target.value);
                              }}
                              // value={""}
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

export default AccountManage;
