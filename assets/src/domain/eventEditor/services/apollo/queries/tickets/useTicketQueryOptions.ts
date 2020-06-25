import { identity, sortBy } from 'ramda';

import { GET_TICKETS } from '../tickets';
import { EntityId } from '@dataServices/types';
import { TicketsList, TicketsQueryArgs, ReadQueryOptions } from '@dataServices/apollo/queries';
import { TicketEdge } from '@edtrServices/apollo/types';
import useDatetimeIds from '../datetimes/useDatetimeIds';
import { useMemoStringify } from '@appServices/hooks';

type DatetimesQueryOptions = ReadQueryOptions<TicketsList<TicketEdge>, TicketsQueryArgs>;

const useTicketQueryOptions = (datetimeIn: EntityId[] = []): DatetimesQueryOptions => {
	const datetimeIds = useDatetimeIds();

	let newDatetimeIn = datetimeIn.length ? datetimeIn : datetimeIds;

	// Sort the IDs list which may be out of order,
	// thus changing the key used to access Apollo Cache
	newDatetimeIn = sortBy(identity, newDatetimeIn);

	const options: DatetimesQueryOptions = {
		query: GET_TICKETS,
		variables: {
			where: {
				datetimeIn: newDatetimeIn,
			},
		},
	};

	return useMemoStringify(options, newDatetimeIn);
};

export default useTicketQueryOptions;