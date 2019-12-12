import { useContext } from '@wordpress/element';
import FormModal from '../../../shared/FormModal';
import DateForm from '../dateForm/DateForm';
import { DateTimeContext } from '../../../../infrastructure/services/contextProviders/DateTimeProvider';
import useEntityMutator from '../../containers/mutations/useEntityMutator';

const EditDateModal = ({ relatedTickets, tickets }) => {
	const { id, isOpen, onClose } = useContext(DateTimeContext);
	const { updateEntity } = useEntityMutator('Datetime', id);

	const formComponent = (props) => (
		<DateForm {...props} relatedTickets={relatedTickets} tickets={tickets} title='Update date' />
	);
	const onSubmit = (fields) => updateEntity(fields);

	return (
		<FormModal
			FormComponent={formComponent}
			initialValues={{}}
			isOpen={isOpen}
			onSubmit={onSubmit}
			onClose={onClose}
			tickets={tickets}
		/>
	);
};

export default EditDateModal;
