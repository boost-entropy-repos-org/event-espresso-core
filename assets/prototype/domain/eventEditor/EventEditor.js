import useInitQueries from '../eventEditor/containers/queries/useInitQueries';
import DatesList from './datesList/DatesList';
import TicketsList from './ticketsList/TicketsList';

const EventEditor = () => {
	const { datetimes, datetimeError, loadingDates, tickets, ticketError, loadingTickets } = useInitQueries();

	return (
		<>
			<DatesList datetimes={datetimes} loading={loadingDates} error={datetimeError} tickets={tickets} />
			<TicketsList
				tickets={tickets}
				datetimes={datetimes}
				loading={loadingTickets}
				loadingDates={loadingDates}
				error={ticketError}
			/>
		</>
	);
};

export default EventEditor;
