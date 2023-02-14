import React, { useEffect, useState, useRef } from "react";
import { dataTable } from "variables/general";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Input,
} from "reactstrap";
import ReactNotificationAlert from "react-notification-alert";
import SimpleHeader from "./components/Header";
import FormRole from "./FormRole";
import ModalWarningCustom from "views/pages/components/ModalWarningCustom";
import { EditSVG, DeleteSVG } from "assets/svg";
import { useSelector, useDispatch } from "react-redux";
import { roleActions } from "Redux/Actions";
import queryString from "query-string";
import _ from "lodash";
import { notify, checkRole } from "common";

const AccountManage = () => {
  const { roles, isGetRoles } = useSelector((state) => state.roleReducer);
  const dispatch = useDispatch();
  const notificationAlertRef = useRef(null);
  const [role, setRole] = useState({});
  const { accounts, isDeleteAccount, isGetAccounts, currentAccount } =
    useSelector((state) => state.accountReducer);
  const [roleManage, setRoleManage] = useState(false);
  const [roleDelete, setRoleDelete] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roleSearch, setRoleSearch] = useState("");

  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
  });

  const handleGetRoles = () => {
    if (roleSearch === "") {
      dispatch(roleActions.getRoles(queryString.stringify(query)));
    } else {
      dispatch(
        roleActions.getRoles(
          queryString.stringify({ ...query, name: roleSearch })
        )
      );
    }
  };

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
            setRole(row);
          }}
        >
          <EditSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target={"edit" + id}>
          Cập nhật phân quyền
        </UncontrolledTooltip>
        <button
          onClick={() => {
            setNotificationModal(true);
            setRole(row);
          }}
          id={"delete" + id}
          style={{ padding: 0, border: "none", background: "none" }}
        >
          <DeleteSVG />
        </button>
        <UncontrolledTooltip delay={1} placement="top" target={"delete" + id}>
          Xóa phân quyền
        </UncontrolledTooltip>
      </>
    );
  };

  const [columns, setColumns] = useState([
    {
      dataField: "name",
      text: "Tên quyền",
    },
    {
      dataField: "id",
      text: "Mã quyền",
    },
    {
      dataField: "actions",
      text: "Hành động",
      formatter: boxAction,
      style: {
        display: "flex",
        justifyContent: "center",
      },
      headerStyle: {
        textAlign: "center",
      },
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
    totalSize: !isNaN(roles?.totalResults) ? roles.totalResults : 0,
    showTotal: false,
    withFirstAndLast: true,
    alwaysShowAllBtns: true,
    sizePerPageRenderer: () => (
      <>
        <Col>
          <p>
            Hiển thị từ {(page - 1) * rowsPerPage + 1} đến{" "}
            {page * rowsPerPage > roles.results.length
              ? !isNaN(roles?.totalResults)
                ? roles.totalResults
                : 0
              : page * rowsPerPage}{" "}
            trong số {!isNaN(roles?.totalResults) ? roles.totalResults : 0} bản
            ghi
          </p>
        </Col>
      </>
    ),
  });

  const handleDelete = () => {
    if (_.isEmpty(role)) return;
    dispatch(
      roleActions.deleteRole(role.id, {
        success: () => {
          setNotificationModal(false);
          notify(
            notificationAlertRef,
            "success",
            "Thông báo",
            `Xóa phân quyền ${role.name} thành công!`
          );
          setRole({});
          handleGetRoles();
        },
        failed: () => {
          notify(
            notificationAlertRef,
            "danger",
            "Thông báo",
            `Xóa phân quyền ${role.name} thất bại!`
          );
        },
      })
    );
  };

  useEffect(() => {
    handleGetRoles();
  }, [query]);

  useEffect(() => {
    if (!_.isEmpty(currentAccount)) {
      if (checkRole(currentAccount, { roles: ["manage_role"] })) {
        setRoleManage(true);
      }
      if (checkRole(currentAccount, { roles: ["delete_role"] })) {
        setRoleDelete(true);
      }
      if (
        !checkRole(currentAccount, { roles: ["manage_role"] }) &&
        !checkRole(currentAccount, { roles: ["delete_role"] })
      ) {
        const index = columns.findIndex((item) => item.dataField === "actions");
        if (index !== -1)
          setColumns([...columns.slice(0, index), ...columns.slice(index + 1)]);
      }
    }
  }, [currentAccount]);

  return (
    <>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      {notificationModal && (
        <ModalWarningCustom
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          name="phân quyền"
          func={handleDelete}
        />
      )}
      {formModal && (
        <FormRole
          isModalAdd={isModalAdd}
          formModal={formModal}
          setFormModal={setFormModal}
          role={role}
          setRole={setRole}
          notificationAlertRef={notificationAlertRef}
          handleGetRoles={handleGetRoles}
        />
      )}
      <SimpleHeader
        setIsModalAdd={setIsModalAdd}
        setFormModal={setFormModal}
        name=""
        parentName="Quản lý"
        setRole={setRole}
        roleManage={roleManage}
      />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <ToolkitProvider
                data={roles.results}
                keyField="id"
                columns={columns}
                search
              >
                {(props) => (
                  <>
                    <Row>
                      <Col>
                        <CardHeader>
                          <h3 className="mb-0">Danh sách phân quyền</h3>
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
                            <h4 className="mb-0">Tìm kiếm tên quyền</h4>
                          </Col>
                          <Col md={6} className="d-flex align-items-center">
                            <Input
                              id="search-by-name"
                              placeholder="Nhập tên"
                              type="text"
                              onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                  handleGetRoles();
                                }
                              }}
                              onChange={(e) => {
                                setRoleSearch(e.target.value);
                              }}
                              className="py-0"
                              bsSize="sm"
                              value={roleSearch}
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
