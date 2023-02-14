import React, { useEffect } from "react";
import Chart from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import _ from "lodash";
// core components
import CardsHeader from "components/Headers/CardsHeader.js";

import { chartOptions, parseOptions, chartExample2 } from "variables/charts.js";
import { useDispatch, useSelector } from "react-redux";
import { reportActions } from "Redux/Actions";

function Dashboard() {
  const dispatch = useDispatch();
  const months = [
    { _id: "01", label: "Tháng 1" },
    { _id: "02", label: "Tháng 2" },
    { _id: "03", label: "Tháng 3" },
    { _id: "04", label: "Tháng 4" },
    { _id: "05", label: "Tháng 5" },
    { _id: "06", label: "Tháng 6" },
    { _id: "07", label: "Tháng 7" },
    { _id: "08", label: "Tháng 8" },
    { _id: "09", label: "Tháng 9" },
    { _id: "10", label: "Tháng 10" },
    { _id: "11", label: "Tháng 11" },
    { _id: "12", label: "Tháng 12" },
  ];
  const [dataChartProductReceive, setDataChartProductReceive] = React.useState({
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Sales",
        maxBarThickness: 10,
        _meta: {},
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  // const { dashboard } = useSelector((state) => state.reportsReducer);
  const dashboard = [];
  const handleGetDashboard = () => {
    // dispatch(
    //   reportActions.getDashboard("", "", {
    //     success: () => {},
    //     failed: () => {},
    //   })
    // );
  };

  useEffect(() => {
    handleGetDashboard();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(dashboard)) {
      const temp = [];
      months.forEach((item, index) => {
        const obj = dashboard.dataChartProductReceive.find(
          (v) => v._id === item._id
        );
        if (!_.isEmpty(obj)) {
          temp.push(obj.totalProductReceive);
        } else {
          temp.push(0);
        }
      });
      // setDataChartProductReceive({
      // 	...dataChartProductReceive,
      // 	datasets: [{ ...dataChartProductReceive.datasets[0], data: temp }],
      // });
    }
  }, [dashboard]);

  return (
    <>
      <CardsHeader name="Báo cáo quản trị nhanh" data={{} || dashboard} />
      <Container className="mt--6" fluid>
        <Row>
          <Col xl="12">
            <Card>
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Thống kê năm {new Date().getFullYear()}
                    </h6>
                    <h5 className="h3 mb-0">
                      Hàng nhận về trong tháng theo lệnh sản xuất
                    </h5>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={dataChartProductReceive}
                    options={chartExample2.options}
                    className="chart-canvas"
                    id="chart-bars"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
