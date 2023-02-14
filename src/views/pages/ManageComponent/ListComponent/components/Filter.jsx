import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  CardFooter,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Styles } from "./styles";
import { provincesActions } from "Redux/Actions";
import queryString from "query-string";
import { customerActions } from "Redux/Actions";
import Select from "react-select";
import CONSTANTS from "constant";

const Filter = ({ toggleOpenFilter, handleFilter, filterValues, open }) => {
  const dispatch = useDispatch();

  const initialFilter = {
    year: "",
    orderStatus: "",
    provinceId: "",
    customerOrganizationId: "",
  };

  const [yearValue, setYearValue] = useState(null);
  const [optionFilter, setOptionFilter] = useState(initialFilter);

  useEffect(() => {}, [filterValues]);

  const clearFilter = () => {};

  return (
    <Styles>
      <Card className={`filter ${open && "show"}`}>
        <CardHeader>
          <span
            style={{ cursor: "pointer" }}
            className="text-danger font-weight-bold"
            onClick={() => {
              toggleOpenFilter();
            }}
          >
            Đóng
          </span>
        </CardHeader>
        <CardBody>
          <FormGroup className="row">
            <Label
              className="form-control-label text-sm"
              htmlFor="example-text-input"
              md="5"
            >
              Lọc theo ...
            </Label>
            <Col md="7">
              <Select
                placeholder="Chọn năm"
                isClearable={true}
                value={yearValue}
                onChange={(e) => {
                  setYearValue(e);
                  setOptionFilter({
                    ...optionFilter,
                    year: !!e ? e : null,
                  });
                }}
                options={Array.apply(null, Array(5)).map((item, index) => ({
                  label: new Date().getFullYear() - index + "",
                  value: new Date().getFullYear() - index + "",
                }))}
              />
            </Col>
          </FormGroup>
        </CardBody>
        <CardFooter>
          <Button
            // className="btn btn-secondary btn-md text-sm btn-block"
            block="true"
            onClick={() => {
              clearFilter();
              handleFilter({});
            }}
          >
            Xóa bộ lọc
          </Button>
          <Button
            className="ml-0"
            block={true}
            color="primary"
            onClick={() => {
              handleFilter(optionFilter);
            }}
          >
            Áp dụng bộ lọc
          </Button>
        </CardFooter>
      </Card>
    </Styles>
  );
};

export default Filter;
