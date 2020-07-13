import React from 'react';
import Select from 'react-dropdown-select';
import styled from '@emotion/styled';

const Dropdown = ({ options, updateFilter, filterTissue }) => {
	const customContentRenderer = ({ props, state }) => (
		<div style={{ cursor: 'pointer' }}>
			{state.values.length} of {props.options.length} tissue selected
		</div>
	);

	const customDropdownRenderer = ({ props, state, methods }) => {
		const regexp = new RegExp(state.search, 'i');

		return (
			<div>
				<SearchAndToggle color={props.color}>
					<Buttons>
						<div>Tissue List:</div>
						{methods.areAllSelected() ? (
							<Button className="clear" onClick={methods.clearAll}>
								Clear all
							</Button>
						) : (
							<Button onClick={methods.selectAll}>Select all</Button>
						)}
					</Buttons>
					<input
						type="text"
						value={state.search}
						onChange={methods.setSearch}
						placeholder="Search any tissue name here"
					/>
				</SearchAndToggle>
				<Items>
					{props.options
						.filter(item =>
							regexp.test(item[props.searchBy] || item[props.labelField])
						)
						.map(option => {
							if (!props.keepSelectedInList && methods.isSelected(option)) {
								return null;
							}

							return (
								<Item
									key={option[props.valueField]}
									onClick={() => methods.addItem(option)}
								>
									<input
										type="checkbox"
										onChange={() => methods.addItem(option)}
										checked={state.values.indexOf(option) !== -1}
									/>
									<ItemLabel>{option[props.labelField]}</ItemLabel>
								</Item>
							);
						})}
				</Items>
			</div>
		);
	};
	return (
		<div>
			<StyledSelect
				placeholder="Select"
				multi
				dropdownPosition="auto"
				contentRenderer={customContentRenderer}
				dropdownRenderer={customDropdownRenderer}
				onChange={value => updateFilter(value)}
				options={options}
				values={options}
				onDropdownClose={filterTissue}
			/>
		</div>
	);
};

const StyledSelect = styled(Select)`
	.react-dropdown-select-dropdown {
		overflow: initial;
	}
`;

const SearchAndToggle = styled.div`
	display: flex;
	flex-direction: column;

	input {
		margin: 10px 10px 0;
		line-height: 30px;
		padding: 0px 20px;
		border: 1px solid #ccc;
		border-radius: 3px;
		:focus {
			outline: none;
			border: 1px solid deepskyblue;
		}
	}
`;

const Items = styled.div`
	overflow: auto;
	min-height: 10px;
	max-height: 200px;
`;

const Item = styled.div`
	display: flex;
	margin: 10px;
	align-items: baseline;
	${({ disabled }) => disabled && 'text-decoration: line-through;'}
`;

const ItemLabel = styled.div`
	margin: 5px 10px;
`;

const Buttons = styled.div`
	display: flex;
	justify-content: space-between;

	& div {
		margin: 10px 0 0 10px;
		font-weight: 400;
	}
`;

const Button = styled.button`
	background: none;
	border: 1px solid #555;
	color: #555;
	border-radius: 3px;
	margin: 10px 10px 0;
	padding: 3px 5px;
	font-size: 10px;
	text-transform: uppercase;
	cursor: pointer;
	outline: none;

	&.clear {
		color: tomato;
		border: 1px solid tomato;
	}

	:hover {
		border: 1px solid deepskyblue;
		color: deepskyblue;
	}
`;

export default Dropdown;
