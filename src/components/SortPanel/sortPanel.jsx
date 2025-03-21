import { Flex, Radio } from "antd";
import classes from "./sortPanel.module.scss";

export default function SortPanel() {
  const options = [
    { label: "Самый дешевый", value: "Cheap" },
    { label: "Самый быстрый", value: "Fast" },
    { label: "Оптимальный", value: "Optimal" },
  ];

  return (
    <div className={classes["sort-panel"]}>
      <Flex vertical gap="middle">
        <Radio.Group
          block
          options={options}
          defaultValue="Cheap"
          optionType="button"
          buttonStyle="solid"
        />
      </Flex>
    </div>
  );
}
