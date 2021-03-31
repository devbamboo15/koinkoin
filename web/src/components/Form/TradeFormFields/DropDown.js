import React from 'react';
import { Select } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

const { Option } = Select;

// todo: add antd component to redux form

const DropDown = (props) => {
	const {
		input: { onChange },
		options,
	} = props;
	return (
		<div className="trade-form-select">
			<Select
				defaultValue={options[0].value}
				bordered={false}
				size="small"
				onChange={onChange}
				suffixIcon={<CaretDownOutlined />}
				className="custom-select-input-style order-entry"
				dropdownClassName="custom-select-style"
			>
				{options.map(({ value, label }, index) => (
					<Option
						name="selectedPairBase"
						value={value}
						key={index}
						className="d-flex"
					>
						{label}
					</Option>
				))}
			</Select>
		</div>
	);
};

export default DropDown;
