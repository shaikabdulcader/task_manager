import React from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

const FilterBar: React.FC = () => {
  return (
    <div className="filter-bar">
      <Input.Search placeholder="Search tasks..." style={{ width: 200, marginRight: 10 }} />
      <Select placeholder="Filter by priority" style={{ width: 150, marginRight: 10 }}>
        <Option value="low">Low</Option>
        <Option value="medium">Medium</Option>
        <Option value="high">High</Option>
      </Select>
      <Select placeholder="Filter by status" style={{ width: 150 }}>
        <Option value="in-progress">In Progress</Option>
        <Option value="completed">Completed</Option>
      </Select>
    </div>
  );
};

export default FilterBar;
