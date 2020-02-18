import gql from 'graphql-tag';
import { TICKET_ATTRIBUTES, TICKET_PRICES_ATTRIBUTE } from '../../queries/tickets';

export const CREATE_TICKET = gql`
	mutation CREATE_TICKET($input: CreateEspressoTicketInput!) {
		createEspressoTicket(input: $input) {
			espressoTicket {
				...ticketAttributes
				...ticketPricesAttribute # fetch default prices when a ticket is created.
			}
		}
	}
	${TICKET_ATTRIBUTES}
	${TICKET_PRICES_ATTRIBUTE}
`;

export const UPDATE_TICKET = gql`
	mutation UPDATE_TICKET($input: UpdateEspressoTicketInput!) {
		updateEspressoTicket(input: $input) {
			espressoTicket {
				...ticketAttributes
				...ticketPricesAttribute # fetch updated prices when a ticket is updated.
			}
		}
	}
	${TICKET_ATTRIBUTES}
	${TICKET_PRICES_ATTRIBUTE}
`;

export const DELETE_TICKET = gql`
	mutation DELETE_TICKET($input: DeleteEspressoTicketInput!) {
		deleteEspressoTicket(input: $input) {
			espressoTicket {
				id
			}
		}
	}
`;

export { default as useTicketMutator } from './useTicketMutator';

export * from './types';