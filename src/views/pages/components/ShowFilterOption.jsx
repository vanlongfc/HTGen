import React from "react";
import * as _ from "lodash";
import { Col, Row } from "reactstrap";
const ShowFilterOption = ({ options, ...rest }) => {
	return _.isEmpty(options) ? (
		<></>
	) : (
		<>
			<Row {...rest}>
				<Col>
					<p>Đang lọc theo : </p>
				</Col>
				<Col>{options.year && <p>Năm: {options.year}</p>}</Col>
			</Row>
		</>
	);
};

export default ShowFilterOption;
