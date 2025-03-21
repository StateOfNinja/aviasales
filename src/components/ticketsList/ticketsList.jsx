import { Button, Flex } from "antd";

import Ticket from "../ticket/ticket";

import "./ticketsList.scss";

export default function TicketsList() {
  return (
    <ul className="tickets-list">
      <Ticket></Ticket>
      <Button type="primary" block>
        Показать ещё
      </Button>
    </ul>
  );
}
