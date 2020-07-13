import React from 'react';
import Dropdown from './Dropdown';

const FilterPanel = ({ tissueList, selectedExpression }) => {
	return (
		<div className="filter-panel-root">
			<div className="filter-panel-title">Filter Panel</div>
			<div className="filter-panel">
				<div className="filter-container">
					<div className="tissue-filter">
						Tissues
						<div className="dropdown">
							<Dropdown
								options={tissueList}
								// updateFilter={updateFilter}
								// filterTissue={filterTissue}
							/>
						</div>
					</div>
					<div className="expression-filter">
						Expression score
						<div className="filter-option">
							{['Low', 'Medium', 'High', 'Not Detected'].map(term => (
								<div
									className={
										selectedExpression[term]
											? 'option selected'
											: 'option not-selected'
									}
									key={term}
								>
									<input
										type="checkbox"
										id={term}
										value={term}
										// onChange={expressionLevelFilter}
										checked={selectedExpression[term]}
									/>
									<label htmlFor={term}>{term}</label>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterPanel;
