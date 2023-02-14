import React from "react";
import PropTypes from "prop-types";
import {
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Container,
	Row,
	Col,
} from "reactstrap";
import * as _ from "lodash";

function TimelineHeader({
	name,
	parentName,
	handleAdd,
	handleFilter,
	options,
	...rest
}) {
	return (
		<>
			<div className="header header-dark bg-primary pb-6 content__title content__title--calendar">
				<Container fluid>
					<div className="header-body">
						<Row className="align-items-center py-4">
							<Col lg="6" xs="7">
								{Object.values(options ?? {}).every((value) =>
									_.isEmpty(value)
								) ? (
									<></>
								) : (
									<>
										<span className="font-weight-600 text-info">
											Đang lọc theo :
										</span>

										{options.status && (
											<span className="font-weight-600 text-info">
												&ensp;Trạng thái: {options.status};
											</span>
										)}
										{options.name && (
											<span className="font-weight-600 text-info">
												&ensp;Tên: {options.name};
											</span>
										)}
										{options.year && (
											<span className="font-weight-600 text-info">
												&ensp;Năm: {options.year.label};
											</span>
										)}
										{options.month && (
											<span className="font-weight-600 text-info">
												&ensp;Tháng: {options.month};
											</span>
										)}
										{options.customerOrganizationId && (
											<span className="font-weight-600 text-info">
												&ensp;Khách hàng: {options.customerOrganizationId.label}
												;
											</span>
										)}
										{options.provinceId && (
											<span className="font-weight-600 text-info">
												&ensp;Thành phố: {options.provinceId.label};
											</span>
										)}
									</>
								)}
							</Col>
							<Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
								{handleAdd && (
									<Button
										className="btn-neutral"
										color="default"
										size="sm"
										onClick={handleAdd}
									>
										Thêm mới
									</Button>
								)}
								{handleFilter && (
									<Button
										className="btn-neutral"
										color="default"
										size="sm"
										onClick={handleFilter}
									>
										Lọc hiển thị
									</Button>
								)}
							</Col>
						</Row>
					</div>
				</Container>
			</div>
		</>
	);
}

TimelineHeader.propTypes = {
	name: PropTypes.string,
	parentName: PropTypes.string,
};

export default TimelineHeader;
