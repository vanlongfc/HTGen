import { saveAs } from "file-saver";
import { Document, ImageRun, Packer, Paragraph } from "docx";
import JsBarcode from "jsbarcode";
import _ from "lodash";
export const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<canvas>()[\]\.,;:\s@\"]{2,})$/i;
export const notify = (notificationAlertRef, type, title, message) => {
  let options = {
    place: "tc",
    message: (
      <div className="alert-text">
        <span className="alert-title" data-notify="title">
          {title}
        </span>
        <span data-notify="message">{message}</span>
      </div>
    ),
    type: type,
    icon: "ni ni-bell-55",
    autoDismiss: 7,
  };
  notificationAlertRef.current.notificationAlert(options);
};
/**
 * Hàm cho phép thực hiện tạo tem phiếu
 * @param {obj|array} data truyen du lieu muon in tem phieu
 *
 *
 */
export const generateDocxBarcode = async (data, nameFile) => {
  let arrData = [];
  arrData = Array.isArray(data) ? [...arrData, ...data] : [...arrData, data];
  console.log(arrData);
  arrData.map((item, idx) => {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "barcode-" + idx);
    canvas.setAttribute("hidden", "true");
    document.body.append(canvas);
    JsBarcode(`#barcode-${idx}`, item.barcode, {
      width: 2,
      height: 40,
      displayValue: true,
    });
  });
  const doc = new Document({
    sections: [
      {
        children: arrData
          .map((item, idx) => {
            const b64 = document
              .querySelector(`#barcode-${idx}`)
              .toDataURL()
              .split(",")[1];
            return [
              new Paragraph(
                "Tên sản phẩm : " + (item?.productId?.name || "Chưa rõ")
              ),
              new Paragraph("Ghi chú : " + (item?.qcNotes || "Không có")),
              new Paragraph("Yêu cầu : " + (item?.qcRequire || "Không có")),
              new Paragraph({
                children: [
                  new ImageRun({
                    data: Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)),
                    transformation: {
                      width: 400,
                      height: 100,
                    },
                  }),
                ],
              }),
            ];
          })
          .reduce((pre, current) => pre.concat(current), []),
      },
    ],
  });

  //Lưu file docx
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${nameFile || "document"}.docx`);
  });
};

export const generateDocxBarcodeForCustomer = async (data, nameFile) => {
  let arrData = [];
  arrData = Array.isArray(data) ? [...arrData, ...data] : [...arrData, data];
  console.log(arrData);
  arrData.map((item, idx) => {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "barcode-" + idx);
    canvas.setAttribute("hidden", "true");
    document.body.append(canvas);
    JsBarcode(`#barcode-${idx}`, item.barcode, {
      width: 2,
      height: 40,
      displayValue: true,
    });
  });
  const doc = new Document({
    sections: [
      {
        children: arrData
          .map((item, idx) => {
            const b64 = document
              .querySelector(`#barcode-${idx}`)
              .toDataURL()
              .split(",")[1];
            return [
              new Paragraph(
                "Tên khách hàng : " + (item?.customerName || "Chưa rõ")
              ),
              new Paragraph(
                "Phòng ban : " + (item?.customerOrgId?.name || "Không có")
              ),
              new Paragraph(
                "Ghi chú : " + (item?.customerSizeId?.notes || "Không có")
              ),
              new Paragraph({
                children: [
                  new ImageRun({
                    data: Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)),
                    transformation: {
                      width: 400,
                      height: 100,
                    },
                  }),
                ],
              }),
            ];
          })
          .reduce((pre, current) => pre.concat(current), []),
      },
    ],
  });

  //Lưu file docx
  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${nameFile || "document"}.docx`);
  });
};
/**
 *
 * @param {obj} currentAccount account
 * @param {array} prop list role want to check
 * @returns true if account have some role in array
 */
export const checkRole = (currentAccount, prop) => {
  let validRole = false;
  const validPropRoles =
    _.get(prop, "roles", undefined) !== undefined && Array.isArray(prop.roles);
  currentAccount.roleId.permission.every((item) => {
    if (
      validPropRoles &&
      (prop.roles.indexOf(item) !== -1 || _.isEmpty(prop.roles))
    ) {
      validRole = true;
      return false;
    }
    return true;
  });
  return validRole;
};

export const currencyFormat = (num) => {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
