const GENDER = {
	Male: "Nam",
	Female: "Nữ",
};
const STATUS = {
	Init: "init",
	Active: "active",
	Lock: "lock",
	Delete: "delete",
};
const RoleName = {
	Admin: "admin",
	User: "user",
};
const CUSTOMER_ORGANIZATION_POPULATE = "childrentIds,parentId";
// Trạng thái kế hoạch đơn hàng
const ORDER_PLAN_STATUS = {
	Init: 0,
	PendingAcept: 1,
	Accept: 2,
	Reject: 3,
};
// Trạng thái đơn hàng
const ORDER_STATUS = {
	Init: 0,
	Processing: 1,
	Done: 2,
	Cancel: 3,
};
// Thể loại sản phảm của khách hàng trong đơn hàng
const CUSTOMER_IN_ORDER_TYPE = {
	Contract: 0, // hợp đồng
	Convert: 1, // chuyển đổi
	Addition: 2, // may thêm
};
// trạng  thái sản phẩm của khách hàng trong đơn hàng
const CUSTOMER_IN_ORDER_STATUS = {
	Init: 0, // khởi tạo - mặc định
	PendingToSennd: 1, // Chờ gửi duyệt
	PendingAcept: 2, // chờ duyệt
	Accept: 3, // chấp nhận
	Reject: 4, // từ chối
};
// các loại cập nhật sản phẩm khách hàng trong đơn hàng
const CUSTOMER_IN_ORDER_UPDATE_TYPE = {
	Import: 0,
	Convert: 1,
	AcceptConvert: 2,
	RejectConvert: 3,
	AcceptAddition: 4,
	RejectAddition: 5,
};
// Trạng thái xử lý size sản phẩm khách hàng trong đơn hàng
const CUSTOMER_IN_ORDER_SIZE_STATUS = {
	Init: 0, /// khởi tạo
	Abnormal: 1, // bất thường
	SuccessAssigned: 2, // đã quy size / gán size
	ownDesign: 3, // may riêng
	FailedAssigned: 4, // quy / gán size failed
};
const TRANSPORT_STATUS = {
	INIT: 0, // khởi tạo
	STAGE: 1, // hoàn thiện công đoạn
	QC: 2, // QC
	FIX: 3, // Hoàn thiện sản phẩm lỗi
	PACK: 4, // hoàn thiện đóng gói
	DELIVERING: 5, // Đang giao hàng
	DELIVERED: 6, // Đã giao hàng
	RECEIVE_FROM_CUSTOMER: 7, // nhận sản phẩm lỗi từ khách hàng
	SEND_TO_PRODUCER: 8, // gửi hàng lỗi cho nhà gia công
};

const PRODUCT_QUALITY = {
	INIT: 0,
	PASS: 1,
	UN_PASS: 2,
};

const REQUIRES = [
	{
		value: "Yêu cầu sửa lỗi",
		label: "Yêu cầu sửa lỗi",
	},
	{
		value: "Yêu cầu điều chỉnh",
		label: "Yêu cầu điều chỉnh",
	},
	{
		value: "Yêu cầu làm thêm",
		label: "Yêu cầu làm thêm",
	},
];

const SEW_TYPE = {
	other: 0,
	vip1: 1,
	vip2: 2,
	vip3: 3,
};

const PRODUCER_TYPE = {
	CUT: 0,
	PRODUCTION: 1,
	ALL: 2,
};
export default {
	GENDER,
	STATUS,
	RoleName,
	CUSTOMER_ORGANIZATION_POPULATE,
	ORDER_PLAN_STATUS,
	ORDER_STATUS,
	CUSTOMER_IN_ORDER_TYPE,
	CUSTOMER_IN_ORDER_UPDATE_TYPE,
	CUSTOMER_IN_ORDER_STATUS,
	CUSTOMER_IN_ORDER_SIZE_STATUS,
	TRANSPORT_STATUS,
	PRODUCT_QUALITY,
	REQUIRES,
	PRODUCER_TYPE,
	SEW_TYPE,
};
