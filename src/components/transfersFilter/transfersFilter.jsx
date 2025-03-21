import React, { useState } from "react";
import { Checkbox, Col } from "antd";

import classes from "./transfersFilter.module.scss";

export default function TransfersFilter() {
  const CheckboxGroup = Checkbox.Group;

  const plainOptions = [
    "Без пересадок",
    "1 пересадка",
    "2 пересадки",
    "3 пересадки",
  ];
  const defaultCheckedList = ["Apple", "Orange"];

  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  return (
    <div className={classes["transfers-filters"]}>
      <h2 className={classes["transfers-filters__title"]}>
        Количество пересадок
      </h2>
      <div className={classes["transfers-filters__checkboxs"]}>
        <Col span={20}>
          <Checkbox
            className={classes["transfers-filters__checkbox"]}
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Все
          </Checkbox>
          <Checkbox.Group value={checkedList} onChange={onChange}>
            {plainOptions.map((option) => (
              <Checkbox
                className={classes["transfers-filters__checkbox"]}
                key={option}
                value={option}
              >
                {option}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </Col>
      </div>
    </div>
  );
}
