import { useSelector, useDispatch } from "react-redux";
import { toggleCheckbox } from "../../store/checkboxSlice";

import classes from "./transfersFilter.module.scss";

export default function TransfersFilter() {
  const dispatch = useDispatch();
  const checkboxes = useSelector((state) => state.checkboxes);

  function changeStateCheckbox(key) {
    dispatch(toggleCheckbox(key));
  }

  return (
    <div className={classes["transfers-filters"]}>
      <h2 className={classes["transfers-filters__title"]}>
        Количество пересадок
      </h2>
      <ul className={classes["transfers-filters__checkboxs"]}>
        {Object.keys(checkboxes).map((key) => (
          <li className={classes["transfers-filters__filter"]} key={key}>
            <label className={classes["transfers-filters__checkbox-label"]}>
              <input
                type="checkbox"
                checked={checkboxes[key]}
                className={classes["transfers-filters__checkbox"]}
                onChange={() => changeStateCheckbox(key)}
              />
              <span
                className={classes["transfers-filters__checkbox-decor"]}
              ></span>
              <span className={classes["transfers-filters__checkbox-text"]}>
                {key}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
