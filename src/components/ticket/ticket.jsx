import { format } from "date-fns";

import classes from "./ticket.module.scss";

export default function Ticket({ ticket }) {
  const TicketInfo = ({ segment }) => {
    const { origin, destination, date, stops, duration } = segment;

    const departureTime = format(new Date(date), "HH:mm");
    const arrivalTime = format(
      new Date(new Date(date).getTime() + duration * 60000),
      "HH:mm"
    );
    const convertedDate = `${departureTime}-${arrivalTime}`;

    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;
    const totalDuration = `${hours}ч ${minutes}м`;

    return (
      <div className={classes["ticket-info"]}>
        <div className={classes["ticket-row"]}>
          <div className={classes.route}>
            <span className={classes["where-from"]}>
              {origin} - {destination}
            </span>
            <span>{convertedDate}</span>
          </div>
          <div className={classes["journey-time"]}>
            <span className={classes.transit}>В пути</span>
            <span className={classes.time}>{totalDuration}</span>
          </div>
          <div className={classes["transfer-info"]}>
            <span className={classes["number-transfers"]}>
              {stops.length === 0
                ? "Без пересадок"
                : `${stops.length} пересадк${stops.length > 1 ? "и" : "а"}`}
            </span>
            <span className={classes["transfer-location"]}>
              {stops.length === 0 ? "-" : stops.join(", ")}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const { price, carrier, segments } = ticket;
  return (
    <li className={classes.ticket}>
      <div className={classes["ticket-header"]}>
        <span className={classes.price}>{price}p</span>
        <img
          src={`https://pics.avs.io/99/36/${carrier}.png`}
          alt="company-logo"
        />
      </div>
      {segments.map((segment, key) => (
        <TicketInfo segment={segment} key={key}></TicketInfo>
      ))}
    </li>
  );
}
