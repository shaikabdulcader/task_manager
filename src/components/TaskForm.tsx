import React from 'react';
import { Button, Form, Input, DatePicker, Select, Card, Space } from 'antd';
import { Task } from '../types/Task';
import { useAppDispatch } from '../redux/hooks';
import { addTask } from '../redux/taskSlice';
import dayjs from 'dayjs';

const { Option } = Select;

const TaskForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = (values: Omit<Task, 'id'>) => {
    const newTask: Task = {
      id: Date.now() + Math.random(), // This ensures a more unique ID
      ...values,
      // Assuming values.dueDate is a Day.js object
      dueDate: values.dueDate ? dayjs(values.dueDate).toDate() : new Date(), // Converts to native Date if using Day.js
    };
    dispatch(addTask(newTask));
    form.resetFields();
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4">
      <Card title="Add New Task" className="w-full max-w-lg p-6 rounded-lg shadow-md">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label={<span className="font-bold">Task Title</span>} rules={[{ required: true }]}>
            <Input placeholder="Enter Task Title" />
          </Form.Item>
          <Form.Item name="description" label={<span className="font-bold">Description</span>} rules={[{ required: true }]}>
            <Input.TextArea placeholder="Enter Task Description" rows={4} />
          </Form.Item>
          <Form.Item name="dueDate" label={<span className="font-bold">Due Date</span>} rules={[{ required: true }]}>
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name="priority" label={<span className="font-bold">Priority</span>} rules={[{ required: true }]}>
            <Select placeholder="Select Priority">
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label={<span className="font-bold">Status</span>} rules={[{ required: true }]}>
            <Select placeholder="Select Status">
              <Option value="in-progress">In Progress</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add Task
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TaskForm;
