import React from 'react';
import Dropdown from './Dropdown';

const FilterPanel = ({
	tissueList,
	selectedExpression,
	expressionLevelFilter,
	updateFilter,
	filterTissue
}) => {
	return (
		<div className="filter-container">
			<div className="tissue-filter">
				Tissues
				<div className="dropdown">
					<Dropdown
						options={tissueList}
						updateFilter={updateFilter}
						filterTissue={filterTissue}
					/>
				</div>
			</div>
			<div className="expression-filter">
				Expression score
				<div className="filter-option">
					{['Low', 'Medium', 'High', 'Not Detected'].map(term => (
						<label key={term}>
							<div
								className={
									selectedExpression[term]
										? 'option selected'
										: 'option not-selected'
								}
							>
								<input
									type="checkbox"
									value={term}
									onChange={expressionLevelFilter}
									checked={selectedExpression[term]}
								/>
								{term}
							</div>
						</label>
					))}
				</div>
			</div>
			<div className="legend">
				<div className="legend-options">
					<div className="legend-title">Expression Level</div>
				</div>
				<div className="legend-options">
					<div
						style={{
							position: 'relative',
							top: 25,
							right: 30,
							width: 30
						}}
					>
						Not Detected
					</div>
				</div>
				<div className="legend-options">
					<div style={{ position: 'relative', top: 25, left: 70 }}>Low</div>
				</div>
				<div className="legend-options">
					<div style={{ position: 'relative', top: 25, left: 130 }}>Medium</div>
				</div>
				<div className="legend-options">
					<div style={{ position: 'relative', top: 25, left: 230 }}>High</div>
				</div>
			</div>
		</div>
	);
};

export default FilterPanel;
