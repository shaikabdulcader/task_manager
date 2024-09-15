import React, { useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import { List, Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { Task } from '../types/Task';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../redux/taskSlice';
import dayjs from 'dayjs'; // For handling dates

const { Option } = Select;

const TaskList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Holds the search term
  const [statusFilter, setStatusFilter] = useState('all'); // Holds the selected status filter
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Create form instance
  const [currentTask, setCurrentTask] = useState<Task | null>(null); // Holds the currently selected task

  // Select tasks from state and filter by search term and status
  const tasks = useAppSelector((state) =>
    state.tasks.tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || task.status === statusFilter) // Filter by status if selected
    )
  );

  const dispatch = useDispatch();

  // Delete a task
  const handleDelete = (id: number) => {
    dispatch(deleteTask(id)); // Dispatch delete action
  };

  // Open modal and set the current task for editing
  const handleEdit = (task: Task) => {
    setCurrentTask(task); // Set the specific task to be edited
    setIsModalVisible(true); // Open the modal
    form.setFieldsValue({
      title: task.title,
      description: task.description,
      dueDate: dayjs(task.dueDate),
      priority: task.priority,
      status: task.status,
    }); // Pre-fill form with task data
  };

  // Handle form submission for task updates
  const onFinish = (values: Omit<Task, 'id'>) => {
    if (currentTask) {
      const updatedTask: Task = {
        ...currentTask, // Keep the current task ID
        ...values,
        dueDate: values.dueDate ? values.dueDate : currentTask.dueDate, // Keep existing due date if not changed
      };
      dispatch(updateTask(updatedTask)); // Dispatch update action
      setIsModalVisible(false); // Close the modal
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 mt-[18px]">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
        {/* Search Input */}
        <Input
          placeholder="Search tasks by title"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />

        {/* Status Filter Dropdown */}
        <Select
          placeholder="Filter by status"
          onChange={(value) => setStatusFilter(value)}
          className="w-48 mb-4"
          allowClear
        >
          <Option value="all">All</Option>
          <Option value="in-progress">In Progress</Option>
          <Option value="completed">Completed</Option>
        </Select>

        {/* Task List */}
        <List
          itemLayout="horizontal"
          dataSource={tasks}
          renderItem={(task: Task) => (
            <List.Item
              actions={[
                <Button type="primary" onClick={() => handleEdit(task)}>
                  Edit
                </Button>,
                <Button type="primary" danger onClick={() => handleDelete(task.id)}>
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={
                  <span className="font-bold">{`${task.title} (${task.priority})`}</span> // Bold font for the title and priority
                }
                description={
                  <>
                    <div className="font-semibold">{task.description}</div> {/* Semi-bold for description */}
                    <div className="font-semibold">Due: {dayjs(task.dueDate).format('DD/MM/YYYY')}</div> {/* Semi-bold for due date */}
                    <div className="font-semibold">Status: {task.status}</div> {/* Semi-bold for status */}
                  </>
                }
              />
            </List.Item>
          )}
        />

        {/* Modal for editing task */}
        {currentTask && (
          <Modal
            title={`Edit Task: ${currentTask.title}`} // Show the task title in the modal title
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)} // Close modal on cancel
            footer={null} // Remove default footer
          >
            <Form
              form={form} // Attach the form instance to control the form programmatically
              layout="vertical"
              onFinish={onFinish} // Handle form submission
            >
              <Form.Item name="title" label="Task Title" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Description">
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
                <DatePicker className="w-full" />
              </Form.Item>
              <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
                <Select>
                  <Option value="low">Low</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="high">High</Option>
                </Select>
              </Form.Item>
              <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                <Select>
                  <Option value="in-progress">In Progress</Option>
                  <Option value="completed">Completed</Option>
                </Select>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TaskList;
