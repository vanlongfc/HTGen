import React, { useEffect, useRef, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import ModalWarningCustom from "views/pages/components/ModalWarningCustom";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  Input,
  UncontrolledTooltip,
} from "reactstrap";
import Header from "./components/Header";
import Filter from "./components/Filter";
import { ViewSVG } from "assets/svg";
import { EditSVG } from "assets/svg";
import { BinSVG } from "assets/svg";
import { Styles } from "./styles";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { orderActions } from "Redux/Actions";
import queryString from "query-string";
import moment from "moment";
import ReactNotificationAlert from "react-notification-alert";
import { notify } from "common";
import _ from "lodash";
import { checkRole } from "common";

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

function ListComponent({ location }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { currentAccount } = useSelector((state) => state.accountReducer);
  const notificationAlertRef = useRef(null);

  const [openFilter, setOpenFilter] = useState(false);
  const [selectItems, setSelectItems] = useState([]);
  const [notificationModal, setNotificationModal] = useState(false);
  const [page, setPage] = useState(location?.state?.page || 1);
  const [rowsPerPage, setRowsPerPage] = useState(
    location?.state?.rowsPerPage || 10
  );

  const [query, setQuery] = useState({
    page: page,
    limit: rowsPerPage,
  });
  const [filterValues, setFilterValues] = useState({
    component1: "",
  });

  const [searchValues, setSearchValues] = useState({
    component1: "",
    component2: "",
    component3: "",
  });

  const toggleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };
  const handleView = (id) => {};

  const handleDelete = () => {};
  const boxAction = (cell, row, id, formatExtraData) => {
    return (
      <>
        {/* {checkRole(currentAccount, { roles: ["get_order"] }) && ( */}
        <>
          <button className="btn-none" onClick={() => {}} id={"view" + id}>
            <ViewSVG />
          </button>
          <UncontrolledTooltip delay={1} placement="top" target={"view" + id}>
            Xem ...
          </UncontrolledTooltip>
        </>
        {/* )} */}
        {/* {checkRole(currentAccount, { roles: ["manage_order"] }) && ( */}
        <>
          <button className="btn-none" onClick={() => {}} id={"edit" + id}>
            <EditSVG />
          </button>
          <UncontrolledTooltip delay={1} placement="top" target={"edit" + id}>
            Cập nhật thông tin ...
          </UncontrolledTooltip>
        </>
        {/* )} */}
        {/* {checkRole(currentAccount, { roles: ["delete_order"] }) && ( */}
        <>
          <button
            onClick={() => {
              setNotificationModal(true);
            }}
            className="btn-none"
            id={"delete" + id}
          >
            <BinSVG />
          </button>
          <UncontrolledTooltip delay={1} placement="top" target={"delete" + id}>
            Xóa ...
          </UncontrolledTooltip>
        </>
        {/* )} */}
      </>
    );
  };

  const columns = [
    {
      dataField: "column1",
      text: "",
      headerFormatter: () => {
        return (
          <Input
            key="input"
            type="search"
            className="border-bottom-search"
            value={searchValues.component1}
            onChange={(e) =>
              setSearchValues({ ...searchValues, component1: e.target.value })
            }
            placeholder="column1"
          />
        );
      },
      style: {
        textAlign: "left",
      },
      headerStyle: {
        width: 250,
      },
    },
    {
      dataField: "column2",
      text: "",
      headerFormatter: () => {
        return (
          <Input
            key="input"
            type="search"
            className="border-bottom-search"
            value={searchValues.component2}
            onChange={(e) =>
              setSearchValues({ ...searchValues, component2: e.target.value })
            }
            placeholder="column2"
          />
        );
      },
      style: {
        textAlign: "left",
      },
      headerStyle: {
        width: 250,
      },
    },
    {
      dataField: "column3",
      text: "",
      headerFormatter: () => {
        return (
          <Input
            key="input"
            type="search"
            className="border-bottom-search"
            value={searchValues.component3}
            onChange={(e) =>
              setSearchValues({
                ...searchValues,
                component3: e.target.value,
              })
            }
            placeholder="column3"
          />
        );
      },
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
  ];

  const selectRow = {
    mode: "checkbox",
    selectColumnPosition: "right",
    onSelect: (row, isSelect) => {
      if (isSelect) {
        setSelectItems([...selectItems, row.id]);
      } else {
        let temp = [...selectItems];
        const index = selectItems.indexOf(row.id);
        if (index > -1) {
          temp.splice(index, 1);
        }
        setSelectItems(temp);
      }
    },
    onSelectAll: (isSelect, rows) => {
      if (isSelect) {
        const temp = rows.map((item) => item.id);
        setSelectItems(temp);
      } else {
        setSelectItems([]);
      }
    },
    selectionHeaderRenderer: ({ indeterminate, ...rest }) => (
      <div className="text-md-right" style={{ verticalAlign: "inherit" }}>
        Lựa chọn{" "}
        <input
          type="checkbox"
          style={{ height: "unset", verticalAlign: "inherit" }}
          ref={(input) => {
            if (input) input.indeterminate = indeterminate;
          }}
          {...rest}
        />
      </div>
    ),
    selectionRenderer: ({ mode, ...rest }) => (
      <div className="d-flex justify-content-end">
        <input type={mode} {...rest} />
      </div>
    ),
    selected: selectItems,
  };

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
        <Col className="d-flex align-items-center">
          <div className="mb-0 d-flex align-items-center">
            <p className="mb-0">Hiển thị </p>
            {
              <select
                value={rowsPerPage}
                name="datatable-basic_length"
                aria-controls="datatable-basic"
                className="form-control form-control-sm mx-2"
                style={{ maxWidth: 60 }}
                onChange={(e) => onSizePerPageChange(e.target.value)}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            }{" "}
            <p className="mb-0">dòng.</p>
          </div>
          <p className="mb-0 ml-3">
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

  const handleGet = () => {};

  const handleAdd = () => {};

  useEffect(() => {
    handleGet();
  }, [query]);

  const handleFilter = () => {};

  const handleSearch = () => {};

  return (
    <Styles>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
      {notificationModal && (
        <ModalWarningCustom
          notificationModal={notificationModal}
          setNotificationModal={setNotificationModal}
          name="..."
          func={handleDelete}
        />
      )}
      <Header
        name=""
        parentName="Quản lý"
        toggleOpenFilter={toggleOpenFilter}
        options={filterValues}
      />

      <Filter
        open={openFilter}
        toggleOpenFilter={toggleOpenFilter}
        handleFilter={handleFilter}
        filterValues={filterValues}
      />

      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <ToolkitProvider
                data={data.results}
                keyField="id"
                columns={columns}
                bootstrap4={true}
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
                      filter={filterFactory()}
                      pagination={pagination}
                      bordered={false}
                      hover
                      remote
                      selectRow={selectRow}
                    />
                  </>
                )}
              </ToolkitProvider>
            </Card>
          </div>
        </Row>
      </Container>
    </Styles>
  );
}

export default ListComponent;
