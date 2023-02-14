import React, { useEffect, useRef, useState } from "react";
import {
  Col,
  Form,
  Row,
  Button,
  Table,
  Card,
  CardHeader,
  Collapse,
  CardBody,
  Spinner,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useParams, useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import { notify } from "common";
import ReactNotificationAlert from "react-notification-alert";
import FileDownload from "js-file-download";
import LoadingButtonCustom from "views/pages/components/LoadingButtonCustom";

const CustomerInfor = ({}) => {
  const dispatch = useDispatch();
  const notificationAlertRef = useRef(null);
  return (
    <div>
      <div className="rna-wrapper">
        <ReactNotificationAlert ref={notificationAlertRef} />
      </div>
    </div>
  );
};

export default CustomerInfor;
