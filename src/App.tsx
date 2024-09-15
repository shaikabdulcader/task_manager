import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-5">Task Manager</h1>
        <div className="flex flex-col lg:flex-row w-full max-w-screen-xl gap-6">
          {/* TaskForm on top for small screens, left for larger screens */}
          <div className="flex-1 lg:w-1/2">
            <TaskForm />
          </div>
          {/* TaskList on bottom for small screens, right for larger screens */}
          <div className="flex-1 lg:w-1/2">
            <TaskList />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
