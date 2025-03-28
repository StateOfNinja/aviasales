import { Flex, Radio } from "antd";
import classes from "./sortPanel.module.scss";
import { setSortType } from "../../store/sortSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SortPanel() {
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.sort.sortType);
  const options = [
    { label: "Самый дешевый", value: "Cheap" },
    { label: "Самый быстрый", value: "Fast" },
    { label: "Оптимальный", value: "Optimal" },
  ];

  function selectedFilter(e) {
    const currentFilter = e.target.value;
    dispatch(setSortType(currentFilter));
  }

  return (
    <div className={classes["sort-panel"]}>
      <Flex vertical gap="middle">
        <Radio.Group
          block
          options={options}
          value={sortType}
          optionType="button"
          buttonStyle="solid"
          onChange={selectedFilter}
        />
      </Flex>
    </div>
  );
}
