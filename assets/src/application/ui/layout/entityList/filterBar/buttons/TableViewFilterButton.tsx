import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { EspressoButton, EspressoButtonType, Icon } from '@application/ui/input';
import FilterButtonWrap from './FilterButtonWrap';
import { TableViewFilterButtonProps } from '../types';

const TableViewFilterButton: React.FC<TableViewFilterButtonProps> = React.memo(({ listId, setTableView, view }) => {
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': view === 'table' });
	const filterId = `ee-table-view-btn-${listId}`;

	return (
		<FilterButtonWrap id={filterId} label={__('table view')}>
			<EspressoButton
				buttonType={EspressoButtonType.MINIMAL}
				className={className}
				icon={Icon.TABLE_VIEW}
				id={filterId}
				onClick={setTableView}
				tooltip={__('table view')}
			/>
		</FilterButtonWrap>
	);
});

export default TableViewFilterButton;