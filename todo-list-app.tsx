import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle,
  Plus,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review quarterly report", completed: false },
    { id: 2, text: "Schedule team meeting", completed: false },
    { id: 3, text: "Update project timeline", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask.trim(),
          completed: false
        }
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTask} className="mb-6 flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus size={24} />
            </button>
          </form>

          <div className="space-y-2">
            {tasks.map(task => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`focus:outline-none ${task.completed ? 'text-green-500' : 'text-gray-400'}`}
                  >
                    {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 focus:outline-none"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showAlert && (
        <div className="fixed bottom-4 right-4">
          <Alert className="bg-green-500 text-white">
            <AlertDescription>
              Task status updated!
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default TodoList;
