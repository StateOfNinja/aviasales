import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useCallback, useMemo } from 'react';

import { Button, Empty } from 'antd';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Ticket from '../ticket/ticket';

import { getSearchId, getTickets } from '../../store/ticketsApiActions';
import { showTickets } from '../../store/ticketsSlice';

import classes from './ticketsList.module.scss';

export default function TicketsList() {
  const dispatch = useDispatch();
  const { searchId, tickets, visibilityTickets, stop } = useSelector((state) => state.tickets);
  const sortType = useSelector((state) => state.sort.sortType);
  const checkboxes = useSelector((state) => state.checkboxes);

  useEffect(() => {
    let intervalId;

    if (!searchId) {
      dispatch(getSearchId());
    }

    if (searchId && !stop)
      intervalId = setInterval(() => {
        dispatch(getTickets(searchId));
      }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch, searchId, stop]);

  function addTickets() {
    dispatch(showTickets());
  }

  const filteringNumberTransfers = useCallback(
    (tickets) => {
      if (checkboxes['Все']) {
        return tickets;
      }

      const activeFilters = Object.keys(checkboxes).filter((key) => checkboxes[key] && key !== 'Все');

      if (activeFilters.length === 0) {
        return [];
      }

      return tickets.filter((ticket) => {
        return ticket.segments.some((segment) => {
          return activeFilters.includes(
            segment.stops.length === 0
              ? 'Без пересадок'
              : `${segment.stops.length} пересадк${segment.stops.length > 1 ? 'и' : 'а'}`
          );
        });
      });
    },
    [checkboxes]
  );

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

  const [progress, setProgress] = useState(tickets.length);

  useEffect(() => {
    const totalountsTitle = 10879;
    setProgress(() => (tickets.length / totalountsTitle) * 100);
  }, [tickets.length]);

  const selectedSortType = useCallback(
    (tickets) => {
      switch (sortType) {
        case 'Cheap':
          return [...tickets].sort((a, b) => a.price - b.price);
        case 'Fast':
          return [...tickets].sort((a, b) => a.segments[0].duration - b.segments[1].duration);
        case 'Optimal':
          return [...tickets].sort((a, b) => a.price - b.price || a.segments[0].duration - b.segments[1].duration);
        default:
          return tickets;
      }
    },
    [sortType]
  );

  const filteredTickets = useMemo(() => filteringNumberTransfers(tickets), [tickets, filteringNumberTransfers]);

  const sortedTickets = useMemo(() => selectedSortType(filteredTickets), [filteredTickets, selectedSortType]);

  const displayedTickets = sortedTickets.slice(0, visibilityTickets);

  return (
    <>
      {!stop && (
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
      )}

      <ul className={classes['tickets-list']}>
        {displayedTickets.length !== 0 ? (
          <>
            {displayedTickets.map((ticket, key) => (
              <Ticket key={key} ticket={ticket} />
            ))}
            <Button type="primary" block onClick={() => addTickets()}>
              Показать ещё
            </Button>
          </>
        ) : (
          <Empty description="Ничего не найдено" />
        )}
      </ul>
    </>
  );
}
