import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, Input } from "reactstrap";
import CONSTANTS from "constant";

const ModalConfirm = ({ open, toggle, name, handle }) => {
  const [vipValue, setVipValue] = useState(0);

  const arrVip = [
    {
      label: "Khác",
      value: CONSTANTS.SEW_TYPE.other,
    },
    {
      label: "VIP 1",
      value: CONSTANTS.SEW_TYPE.vip1,
    },
    {
      label: "VIP 2",
      value: CONSTANTS.SEW_TYPE.vip2,
    },
    {
      label: "VIP 3",
      value: CONSTANTS.SEW_TYPE.vip3,
    },
  ];

  return (
    <Modal isOpen={open} toggle={toggle} className="modal-primary">
      <ModalBody>
        <h3 className="text-white color-white">{name}</h3>
        <label className="form-control-label text-white" htmlFor="vip">
          Đối tượng
        </label>

        <Input
          value={vipValue}
          onChange={(e) => {
            setVipValue(Number(e.target.value));
          }}
          id="vip"
          name="vip"
          type="select"
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            height: 36,
          }}
        >
          {arrVip.map((item) => {
            return <option value={item.value}>{item.label}</option>;
          })}
        </Input>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Hủy bỏ
        </Button>
        <Button
          className="btn-neutral"
          color="default"
          onClick={() => handle(vipValue)}
        >
          Đồng ý
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalConfirm;
