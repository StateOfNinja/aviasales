import classes from "./app.module.scss";

import logoSvg from "../../assets/Logo.svg";
import SortPanel from "../SortPanel/sortPanel";
import TicketsList from "../ticketsList/ticketsList";
import TransfersFilter from "../transfersFilter/transfersFilter";

import { Fragment } from "react";

export default function App() {
  return (
    <Fragment>
      <div className={classes["container-logo"]}>
        <img src={logoSvg} alt="" />
      </div>
      <div className={classes["aviasales-app"]}>
        <TransfersFilter></TransfersFilter>
        <div className={classes["container-tickets"]}>
          <SortPanel></SortPanel>
          <TicketsList></TicketsList>
        </div>
      </div>
    </Fragment>
  );
}
