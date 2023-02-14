import React, { useState, useEffect } from "react";
import {
  Modal,
  Card,
  CardHeader,
  CardBody,
  Form,
  Col,
  Table,
  Button,
} from "reactstrap";
import InputCustom from "views/pages/components/InputCustom";
import RequireCustom from "views/pages/components/RequireCustom";
import SwitchCustom from "views/pages/components/SwitchCustom";
import { toObjectName } from "./utils";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { roleActions } from "Redux/Actions";
import queryString from "query-string";
import { notify } from "common";

const FormRole = ({
  formModal,
  setFormModal,
  isModalAdd,
  role,
  setRole,
  notificationAlertRef,
  handleGetRoles,
}) => {
  const dispatch = useDispatch();
  const { rolePermission } = useSelector((state) => state.roleReducer);

  const [permissions, setPermissions] = useState({});
  let arrCodeFilter = [];
  const [blur, setBlur] = useState({
    name: false,
  });

  const [values, setValues] = useState({
    name: "",
    permissions: [],
  });

  useEffect(() => {
    setPermissions(toObjectName(rolePermission.results));
  }, [rolePermission]);

  useEffect(() => {
    if (!isModalAdd && !_.isEmpty(role)) {
      setValues({ name: role.name, permissions: _.cloneDeep(role.permission) });
    } else {
      setValues({
        name: "",
        permissions: [],
      });
    }
  }, [formModal]);

  useEffect(() => {
    dispatch(
      roleActions.getRolePermission(
        queryString.stringify({
          limit: 9999,
        })
      )
    );
  }, [formModal]);

  const renderCode = (arr) => {
    let arrCode = [];
    if (Array.isArray(arr)) {
      arr.map((index) => {
        if (typeof index !== "object") {
          const arrMiddle = arrCode;
          arrMiddle.push(index.split("/")[1]);
          arrCode = arrMiddle;
        } else {
          Object.keys(index).map((index1) => {
            const arrMiddle = arrCode.concat(renderCode(index[index1]));
            arrCode = arrMiddle;
          });
        }
      });
    } else {
      arrCode.push(arr.code);
    }
    return arrCode;
  };

  const onChangeRoleName = (e) => {
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  const onSubmit = () => {
    values.permissions.map((index, key) => {
      if (arrCodeFilter.indexOf(index) === -1) {
        values.permissions.splice(key, 1);
      }
    });
    // if (isModalAdd) {
    //   dispatch(
    //     roleActions.createRole(
    //       { name: values.name, permission: values.permissions },
    //       {
    //         success: () => {
    //           notify(
    //             notificationAlertRef,
    //             "success",
    //             "Thông báo",
    //             `Thêm phân quyền ${values.name} thành công!`
    //           );
    //           setRole({});
    //           setFormModal(false);
    //           handleGetRoles();
    //         },
    //         failed: (mess) => {
    //           notify(
    //             notificationAlertRef,
    //             "danger",
    //             "Thông báo",
    //             `Thêm phân quyền ${values.name} thất bại. Lỗi: ${mess}!`
    //           );
    //         },
    //       }
    //     )
    //   );
    // } else {
    //   dispatch(
    //     roleActions.updateRole(
    //       { name: values.name, permission: values.permissions },
    //       role.id,
    //       {
    //         success: () => {
    //           notify(
    //             notificationAlertRef,
    //             "success",
    //             "Thông báo",
    //             `Cập nhật phân quyền ${values.name} thành công!`
    //           );
    //           setRole({});
    //           setFormModal(false);
    //           handleGetRoles();
    //         },
    //         failed: (mess) => {
    //           notify(
    //             notificationAlertRef,
    //             "danger",
    //             "Thông báo",
    //             `Cập nhật phân quyền ${values.name} thất bại. Lỗi: ${mess}!`
    //           );
    //         },
    //       }
    //     )
    //   );
    // }
  };

  const renderTableName = (name, arr, key, key1, colorRow, space) => {
    const keyTable = !!key1 ? key + "." + key1 : key;
    let arrCode = [];
    let checkCodeView = [];
    let checkCodeEdit = [];
    let checkCodeApprove = [];
    let checkCodeDelete = [];
    let Space = !!space ? space + "__" : "";
    arrCode = renderCode(arr);
    arrCode.map((index) => {
      if (
        !!values.permissions &&
        values.permissions.indexOf("get_" + index) !== -1
      ) {
        checkCodeView.push("get_" + index);
      }
      if (
        !!values.permissions &&
        values.permissions.indexOf("manage_" + index) !== -1
      ) {
        checkCodeEdit.push("manage_" + index);
      }
      if (
        !!values.permissions &&
        values.permissions.indexOf("approve_" + index) !== -1
      ) {
        checkCodeApprove.push("approve_" + index);
      }
      if (
        !!values.permissions &&
        values.permissions.indexOf("delete_" + index) !== -1
      ) {
        checkCodeDelete.push("delete_" + index);
      }
      if (arrCodeFilter.indexOf("get_" + index) === -1) {
        arrCodeFilter.push("get_" + index);
      }
      if (arrCodeFilter.indexOf("manage_" + index) === -1) {
        arrCodeFilter.push("manage_" + index);
      }
      if (arrCodeFilter.indexOf("approve_" + index) === -1) {
        arrCodeFilter.push("approve_" + index);
      }
      if (arrCodeFilter.indexOf("delete_" + index) === -1) {
        arrCodeFilter.push("delete_" + index);
      }
    });

    const checkCodeApproveFunc = (code) => {
      return code === "customerInOrder";
    };

    return !_.isEmpty(arr) && Array.isArray(arr) ? (
      <>
        <tr style={{ backgroundColor: colorRow }} key={key + `${keyTable}`}>
          <td>
            <a style={{ color: "transparent" }}>{Space}</a>
            {keyTable}
          </td>
          <td className="table-user">
            <b>{name}</b>
          </td>
          <td className="">
            <div className="d-flex justify-content-center">
              <SwitchCustom
                className="custom-toggle custom-toggle-success mr-1"
                value="get"
                labelOff="Tắt"
                labelOn="Bật"
                checked={arrCode.length === checkCodeView.length}
                onChange={() => {
                  const permissionMiddle = values.permissions;
                  if (arrCode.length === checkCodeView.length) {
                    checkCodeView.map((index) => {
                      permissionMiddle.splice(
                        permissionMiddle.indexOf(index),
                        1
                      );
                      if (
                        permissionMiddle.indexOf(
                          "manage_" + index.split("get_")[1]
                        ) !== -1
                      ) {
                        permissionMiddle.splice(
                          permissionMiddle.indexOf(
                            "manage_" + index.split("get_")[1]
                          ),
                          1
                        );
                      }
                      if (
                        permissionMiddle.indexOf(
                          "approve_" + index.split("get_")[1]
                        ) !== -1
                      ) {
                        permissionMiddle.splice(
                          permissionMiddle.indexOf(
                            "approve_" + index.split("get_")[1]
                          ),
                          1
                        );
                      }
                      if (
                        permissionMiddle.indexOf(
                          "delete_" + index.split("get_")[1]
                        ) !== -1
                      ) {
                        permissionMiddle.splice(
                          permissionMiddle.indexOf(
                            "delete_" + index.split("get_")[1]
                          ),
                          1
                        );
                      }
                    });
                  } else {
                    arrCode.map((index) => {
                      if (permissionMiddle.indexOf("get_" + index) === -1) {
                        permissionMiddle.push("get_" + index);
                      }
                    });
                  }
                  // setFieldValue('permissions', permissionMiddle);
                  setValues({
                    ...values,
                    permissions: permissionMiddle,
                  });
                }}
              />
            </div>
          </td>
          <td className="">
            <div className="d-flex justify-content-center">
              <SwitchCustom
                className="custom-toggle custom-toggle-success mr-1"
                value="update"
                labelOff="Tắt"
                labelOn="Bật"
                checked={arrCode.length === checkCodeEdit.length}
                onChange={() => {
                  const permissionMiddle = values.permissions;
                  if (arrCode.length === checkCodeEdit.length) {
                    checkCodeEdit.map((index) => {
                      permissionMiddle.splice(
                        permissionMiddle.indexOf(index),
                        1
                      );
                    });
                  } else {
                    arrCode.map((index) => {
                      if (permissionMiddle.indexOf("manage_" + index) === -1) {
                        permissionMiddle.push("manage_" + index);
                      }
                      if (permissionMiddle.indexOf("get_" + index) === -1) {
                        permissionMiddle.push("get_" + index);
                      }
                    });
                  }
                  // setFieldValue('permissions', permissionMiddle);
                  setValues({
                    ...values,
                    permissions: permissionMiddle,
                  });
                }}
              />
            </div>
          </td>
          <td className="">
            {arrCode.indexOf("customerInOrder") !== -1 && (
              <div className="d-flex justify-content-center">
                <SwitchCustom
                  className="custom-toggle custom-toggle-success mr-1"
                  value="update"
                  labelOff="Tắt"
                  labelOn="Bật"
                  checked={arrCode.length === checkCodeApprove.length}
                  onChange={() => {
                    const permissionMiddle = values.permissions;
                    if (arrCode.length === checkCodeApprove.length) {
                      checkCodeApprove.map((index) => {
                        permissionMiddle.splice(
                          permissionMiddle.indexOf(index),
                          1
                        );
                      });
                    } else {
                      arrCode.map((index) => {
                        if (
                          permissionMiddle.indexOf("approve_" + index) === -1
                        ) {
                          permissionMiddle.push("approve_" + index);
                        }
                        if (permissionMiddle.indexOf("get_" + index) === -1) {
                          permissionMiddle.push("get_" + index);
                        }
                      });
                    }
                    // setFieldValue('permissions', permissionMiddle);
                    setValues({
                      ...values,
                      permissions: permissionMiddle,
                    });
                  }}
                />
              </div>
            )}
          </td>
          <td className="">
            <div className="d-flex justify-content-center">
              <SwitchCustom
                className="custom-toggle custom-toggle-success mr-1"
                value="delete"
                labelOff="Tắt"
                labelOn="Bật"
                checked={arrCode.length === checkCodeDelete.length}
                onChange={() => {
                  const permissionMiddle = values.permissions;
                  if (arrCode.length === checkCodeDelete.length) {
                    checkCodeDelete.map((index) => {
                      permissionMiddle.splice(
                        permissionMiddle.indexOf(index),
                        1
                      );
                    });
                  } else {
                    arrCode.map((index) => {
                      if (permissionMiddle.indexOf("delete_" + index) === -1) {
                        permissionMiddle.push("delete_" + index);
                      }
                      if (permissionMiddle.indexOf("get_" + index) === -1) {
                        permissionMiddle.push("get_" + index);
                      }
                    });
                  }
                  // setFieldValue('permissions', permissionMiddle);
                  setValues({
                    ...values,
                    permissions: permissionMiddle,
                  });
                }}
              />
            </div>
          </td>
        </tr>
        {arr.map((index, key1) => {
          if (typeof index !== "object") {
            return (
              <tr
                style={{ backgroundColor: colorRow }}
                key={key1 + "get_" + index.split("/")[1]}
              >
                <td>
                  <a style={{ color: "transparent" }}>{Space + "__"}</a>
                  {keyTable + "." + (key1 + 1)}
                </td>
                <td className="table-user">
                  <b>{index.split("/")[0]}</b>
                </td>
                <td className="">
                  <div className="d-flex justify-content-center">
                    <SwitchCustom
                      className="custom-toggle custom-toggle-success mr-1"
                      value={"get_" + index.split("/")[1]}
                      checked={
                        !!values.permissions &&
                        values.permissions.indexOf(
                          "get_" + index.split("/")[1]
                        ) !== -1
                      }
                      labelOff="Tắt"
                      labelOn="Bật"
                      onChange={(e) => {
                        const selectedIndex = values.permissions.indexOf(
                          e.target.value
                        );
                        let newselectedRole = values.permissions;

                        if (selectedIndex === -1) {
                          newselectedRole.push(e.target.value);
                        } else {
                          newselectedRole.splice(selectedIndex, 1);
                          if (
                            newselectedRole.indexOf(
                              "manage_" + e.target.value.split("get_")[1]
                            ) !== -1
                          ) {
                            newselectedRole.splice(
                              newselectedRole.indexOf(
                                "manage_" + e.target.value.split("get_")[1]
                              ),
                              1
                            );
                          }
                          if (
                            newselectedRole.indexOf(
                              "approve_" + e.target.value.split("get_")[1]
                            ) !== -1
                          ) {
                            newselectedRole.splice(
                              newselectedRole.indexOf(
                                "approve_" + e.target.value.split("get_")[1]
                              ),
                              1
                            );
                          }
                          if (
                            newselectedRole.indexOf(
                              "delete_" + e.target.value.split("get_")[1]
                            ) !== -1
                          ) {
                            newselectedRole.splice(
                              newselectedRole.indexOf(
                                "delete_" + e.target.value.split("get_")[1]
                              ),
                              1
                            );
                          }
                        }
                        // setFieldValue('permissions', newselectedRole);
                        setValues({
                          ...values,
                          permissions: newselectedRole,
                        });
                      }}
                    />
                  </div>
                </td>
                <td className="">
                  <div className="d-flex justify-content-center">
                    <SwitchCustom
                      className="custom-toggle custom-toggle-success mr-1"
                      value={"manage_" + index.split("/")[1]}
                      checked={
                        !!values.permissions &&
                        values.permissions.indexOf(
                          "manage_" + index.split("/")[1]
                        ) !== -1
                      }
                      labelOff="Tắt"
                      labelOn="Bật"
                      onChange={(e) => {
                        const selectedIndex = values.permissions.indexOf(
                          e.target.value
                        );
                        let newselectedRole = values.permissions;

                        if (selectedIndex === -1) {
                          newselectedRole.push(e.target.value);
                          if (
                            newselectedRole.indexOf(
                              "get_" + e.target.value.split("manage_")[1]
                            ) === -1
                          ) {
                            newselectedRole.push(
                              "get_" + e.target.value.split("manage_")[1]
                            );
                          }
                        } else {
                          newselectedRole.splice(selectedIndex, 1);
                        }

                        // setFieldValue('permissions', newselectedRole);
                        setValues({
                          ...values,
                          permissions: newselectedRole,
                        });
                      }}
                    />
                  </div>
                </td>
                <td className="">
                  {checkCodeApproveFunc(arr.code) && (
                    <div className="d-flex justify-content-center">
                      <SwitchCustom
                        className="custom-toggle custom-toggle-success mr-1"
                        value={"approve_" + index.split("/")[1]}
                        checked={
                          !!values.permissions &&
                          values.permissions.indexOf(
                            "approve_" + index.split("/")[1]
                          ) !== -1
                        }
                        labelOff="Tắt"
                        labelOn="Bật"
                        onChange={(e) => {
                          const selectedIndex = values.permissions.indexOf(
                            e.target.value
                          );
                          let newselectedRole = values.permissions;

                          if (selectedIndex === -1) {
                            newselectedRole.push(e.target.value);
                            if (
                              newselectedRole.indexOf(
                                "get_" + e.target.value.split("approve_")[1]
                              ) === -1
                            ) {
                              newselectedRole.push(
                                "get_" + e.target.value.split("approve_")[1]
                              );
                            }
                          } else {
                            newselectedRole.splice(selectedIndex, 1);
                          }

                          // setFieldValue('permissions', newselectedRole);
                          setValues({
                            ...values,
                            permissions: newselectedRole,
                          });
                        }}
                      />
                    </div>
                  )}
                </td>
                <td className="">
                  <div className="d-flex justify-content-center">
                    <SwitchCustom
                      className="custom-toggle custom-toggle-success mr-1"
                      value={"delete_" + index.split("/")[1]}
                      checked={
                        !!values.permissions &&
                        values.permissions.indexOf(
                          "delete_" + index.split("/")[1]
                        ) !== -1
                      }
                      onChange={(e) => {
                        const selectedIndex = values.permissions.indexOf(
                          e.target.value
                        );
                        let newselectedRole = values.permissions;

                        if (selectedIndex === -1) {
                          newselectedRole.push(e.target.value);
                          if (
                            newselectedRole.indexOf(
                              "get_" + e.target.value.split("delete_")[1]
                            ) === -1
                          ) {
                            newselectedRole.push(
                              "get_" + e.target.value.split("delete_")[1]
                            );
                          }
                        } else {
                          newselectedRole.splice(selectedIndex, 1);
                        }
                        // setFieldValue('permissions', newselectedRole);
                        setValues({
                          ...values,
                          permissions: newselectedRole,
                        });
                      }}
                      labelOff="Tắt"
                      labelOn="Bật"
                    />
                  </div>
                </td>
              </tr>
            );
          } else {
            return Object.keys(index).map((index1, key) => {
              return renderTableName(
                index1,
                index[index1],
                keyTable,
                key1 + 1,
                colorRow,
                Space + "__"
              );
            });
          }
        })}
      </>
    ) : (
      <>
        <tr style={{ backgroundColor: colorRow }} key={key + `${keyTable}`}>
          <td>
            <a style={{ color: "transparent" }}>{Space}</a>
            {keyTable}
          </td>
          <td className="table-user">
            <b>{name}</b>
          </td>
          <td>
            <div className="d-flex justify-content-center">
              <SwitchCustom
                className="custom-toggle custom-toggle-success mr-1"
                labelOff="Tắt"
                labelOn="Bật"
                value={"get_" + arr.code}
                checked={
                  !!values.permissions &&
                  values.permissions.indexOf("get_" + arr.code) !== -1
                }
                onChange={(e) => {
                  const selectedIndex = values.permissions.indexOf(
                    e.target.value
                  );
                  let newselectedRole = values.permissions;
                  if (selectedIndex === -1) {
                    newselectedRole.push(e.target.value);
                  } else {
                    newselectedRole.splice(selectedIndex, 1);
                    if (
                      newselectedRole.indexOf(
                        "manage_" + e.target.value.split("get_")[1]
                      ) !== -1
                    ) {
                      newselectedRole.splice(
                        newselectedRole.indexOf(
                          "manage_" + e.target.value.split("get_")[1]
                        ),
                        1
                      );
                    }
                    if (
                      newselectedRole.indexOf(
                        "delete_" + e.target.value.split("get_")[1]
                      ) !== -1
                    ) {
                      newselectedRole.splice(
                        newselectedRole.indexOf(
                          "delete_" + e.target.value.split("get_")[1]
                        ),
                        1
                      );
                    }
                  }
                  // setFieldValue('permissions', newselectedRole);
                  setValues({
                    ...values,
                    permissions: newselectedRole,
                  });
                }}
              />
            </div>
          </td>
          <td>
            <div className="d-flex justify-content-center">
              <SwitchCustom
                className="custom-toggle custom-toggle-success mr-1"
                labelOff="Tắt"
                labelOn="Bật"
                value={"manage_" + arr.code}
                checked={
                  !!values.permissions &&
                  values.permissions.indexOf("manage_" + arr.code) !== -1
                }
                onChange={(e) => {
                  const selectedIndex = values.permissions.indexOf(
                    e.target.value
                  );
                  let newselectedRole = values.permissions;

                  if (selectedIndex === -1) {
                    newselectedRole.push(e.target.value);
                    if (
                      newselectedRole.indexOf(
                        "get_" + e.target.value.split("manage_")[1]
                      ) === -1
                    ) {
                      newselectedRole.push(
                        "get_" + e.target.value.split("manage_")[1]
                      );
                    }
                  } else {
                    newselectedRole.splice(selectedIndex, 1);
                  }

                  // setFieldValue('permissions', newselectedRole);
                  setValues({
                    ...values,
                    permissions: newselectedRole,
                  });
                }}
              />
            </div>
          </td>
          <td>
            {arr.code === "customerInOrder" && (
              <div className="d-flex justify-content-center">
                <SwitchCustom
                  className="custom-toggle custom-toggle-success mr-1"
                  labelOff="Tắt"
                  labelOn="Bật"
                  value={"approve_" + arr.code}
                  checked={
                    !!values.permissions &&
                    values.permissions.indexOf("approve_" + arr.code) !== -1
                  }
                  onChange={(e) => {
                    const selectedIndex = values.permissions.indexOf(
                      e.target.value
                    );
                    let newselectedRole = values.permissions;

                    if (selectedIndex === -1) {
                      newselectedRole.push(e.target.value);
                      if (
                        newselectedRole.indexOf(
                          "get_" + e.target.value.split("approve_")[1]
                        ) === -1
                      ) {
                        newselectedRole.push(
                          "get_" + e.target.value.split("approve_")[1]
                        );
                      }
                    } else {
                      newselectedRole.splice(selectedIndex, 1);
                    }

                    // setFieldValue('permissions', newselectedRole);
                    setValues({
                      ...values,
                      permissions: newselectedRole,
                    });
                  }}
                />
              </div>
            )}
          </td>
          <td>
            <div className="d-flex justify-content-center">
              <SwitchCustom
                className="custom-toggle custom-toggle-success mr-1"
                labelOff="Tắt"
                labelOn="Bật"
                value={"delete_" + arr.code}
                checked={
                  !!values.permissions &&
                  values.permissions.indexOf("delete_" + arr.code) !== -1
                }
                onChange={(e) => {
                  const selectedIndex = values.permissions.indexOf(
                    e.target.value
                  );
                  let newselectedRole = values.permissions;

                  if (selectedIndex === -1) {
                    newselectedRole.push(e.target.value);
                    if (
                      newselectedRole.indexOf(
                        "get_" + e.target.value.split("delete_")[1]
                      ) === -1
                    ) {
                      newselectedRole.push(
                        "get_" + e.target.value.split("delete_")[1]
                      );
                    }
                  } else {
                    newselectedRole.splice(selectedIndex, 1);
                  }
                  // setFieldValue('permissions', newselectedRole);
                  setValues({
                    ...values,
                    permissions: newselectedRole,
                  });
                }}
              />
            </div>
          </td>
        </tr>
      </>
    );
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        size="lg"
        style={{ maxWidth: "1248px", width: "100%" }}
        isOpen={formModal}
        toggle={() => {
          setFormModal(false);
          setRole({});
          setBlur({ name: false });
        }}
      >
        <div className="modal-body p-0">
          <Card className="bg-white border-0 mb-0">
            <CardHeader className="bg-transparent pb-2 modal-header">
              <h2 className="mb-0">
                {isModalAdd ? "Thêm phân quyền" : "Cập nhật phân quyền"}
              </h2>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => {
                  setFormModal(false);
                  setRole({});
                  setBlur({ name: false });
                }}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-3">
              <Form className="needs-validation" noValidate>
                <div className="form-row">
                  <Col className="mb-3" md="4">
                    <InputCustom
                      className="max-height-input-custom"
                      label="Tên quyền"
                      required={<RequireCustom />}
                      placeholder="Vui lòng nhập tên phân quyền"
                      type="text"
                      id="role-name"
                      invalid={blur.name && values.name === ""}
                      onChange={(e) => onChangeRoleName(e)}
                      messageInvalid="Tên quyền không được để trống!"
                      value={values.name}
                      onBlur={() => {
                        setBlur({
                          name: true,
                        });
                      }}
                    />
                  </Col>
                </div>
                <div>
                  <h4 className="mb-0">
                    Thiết lập phân quyền
                    <RequireCustom />
                  </h4>
                  <h6>
                    <i>(Vui lòng bật chức năng cho phép)</i>
                  </h6>
                </div>
                <div style={{ maxHeight: 600, overflow: "auto" }}>
                  <Table
                    className="align-items-center table-flush"
                    hover
                    responsive
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>STT</th>
                        <th>Chức năng quản lý</th>
                        <th style={{ textAlign: "center" }}>Xem</th>
                        <th style={{ textAlign: "center" }}>Quản lý</th>
                        <th style={{ textAlign: "center" }}>Duyệt</th>
                        <th style={{ textAlign: "center" }}>Xóa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(permissions).map((item, index) => {
                        const colorRow =
                          index % 2 !== 0
                            ? "rgba(255, 255, 255, 1)"
                            : "rgba(220, 225, 227, .2)";
                        return renderTableName(
                          item,
                          permissions[item],
                          index + 1,
                          "",
                          colorRow,
                          ""
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Form>
            </CardBody>
            <div className="px-lg-5 py-lg-3 d-flex justify-content-end">
              <Button
                onClick={() => {
                  setFormModal(false);
                  setRole({});
                  setBlur({ name: false });
                }}
                color=""
                size="md"
                type="button"
              >
                Hủy
              </Button>
              <Button
                onClick={() => {
                  if (values.name === "") return;
                  onSubmit();
                }}
                color="primary"
                size="md"
                type="button"
              >
                {isModalAdd ? "Thêm mới" : "Lưu lại"}
              </Button>
            </div>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default FormRole;
