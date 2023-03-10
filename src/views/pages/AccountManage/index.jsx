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
    //         "Th??ng b??o",
    //         `X??a t??i kho???n ${account.email} th??nh c??ng!`
    //       );
    //       handleGetAccounts();
    //     },
    //     failed: () => {
    //       notify(
    //         notificationAlertRef,
    //         "danger",
    //         "Th??ng b??o",
    //         `X??a t??i kho???n ${account.email} th???t b???i!`
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
              C???p nh???t th??ng tin t??i kho???n
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
              Thi???t l???p m???t kh???u
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
              X??a t??i kho???n
            </UncontrolledTooltip>
          </>
        )}
      </>
    );
  };
  const [columns, setColumns] = useState([
    {
      dataField: "name",
      text: "T??n t??i kho???n",
      style: {
        textAlign: "left",
      },
      headerStyle: {
        textAlign: "left",
      },
    },
    {
      dataField: "roleId.name",
      text: "Nh??m quy???n",
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
      text: "?????a ch???",
      style: {
        textAlign: "left",
      },
      headerStyle: {
        textAlign: "left",
      },
    },
    {
      dataField: "status",
      text: "Tr???ng th??i",
    },
    {
      dataField: "actions",
      text: "H??nh ?????ng",
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
            Hi???n th??? t??? {(page - 1) * rowsPerPage + 1} ?????n{" "}
            {page * rowsPerPage > data.results.length
              ? !isNaN(data?.totalResults)
                ? data.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong s??? {!isNaN(data?.totalResults) ? data.totalResults : 0} b???n
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
          text: "T??n t??i kho???n",
          style: {
            textAlign: "left",
          },
          headerStyle: {
            textAlign: "left",
          },
        },
        {
          dataField: "roleId.name",
          text: "Nh??m quy???n",
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
          text: "?????a ch???",
          style: {
            textAlign: "left",
          },
          headerStyle: {
            textAlign: "left",
          },
        },
        {
          dataField: "status",
          text: "Tr???ng th??i",
        },
        {
          dataField: "actions",
          text: "H??nh ?????ng",
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
          name="t??i kho???n"
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
        parentName="Qu???n l??"
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
                          <h3 className="mb-0">Danh s??ch t??i kho???n</h3>
                        </CardHeader>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <CardHeader>
                          <div className="mb-0 d-flex align-items-center">
                            <p className="mb-0">Hi???n th??? </p>
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
                            <p className="mb-0">d??ng</p>
                          </div>
                        </CardHeader>
                      </Col>
                      <Col className="d-flex align-items-center mr-4 justify-content-end">
                        <Row style={{ width: "100%" }}>
                          <Col
                            md={6}
                            className="d-flex align-items-center justify-content-end"
                          >
                            <h4 className="mb-0">T??m ki???m t??n t??i kho???n</h4>
                          </Col>
                          <Col md={6} className="d-flex align-items-center">
                            <Input
                              id="search-by-name"
                              placeholder="Nh???p t??n"
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
                            Kh??ng c?? d??? li???u!
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
