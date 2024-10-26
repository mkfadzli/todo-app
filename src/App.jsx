import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle,
  Plus,
  Trash2,
  AlertCircle
} from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, text: "Doa at Multazam", completed: false },
      { id: 2, text: "Doa at Hijr Ismail", completed: false },
      { id: 3, text: "Doa at Hajar Aswad", completed: false },
    ];
  });
  
  const [newTask, setNewTask] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const showNotification = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

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
      showNotification("Doa added successfully!");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    showNotification("Status updated!");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    showNotification("Doa removed!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">List of Doas in Makkah & Madinah</h1>
          
          <form onSubmit={addTask} className="mb-4 flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new doa..."
              className="flex-1 p-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <Plus size={20} />
            </button>
          </form>

          <div className="space-y-1">
            {tasks.map(task => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`focus:outline-none ${task.completed ? 'text-green-500' : 'text-gray-400'}`}
                  >
                    {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </button>
                  <span className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 focus:outline-none"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-100 p-3">
          <p className="text-xs text-gray-500 text-center">
            Written in React by Fadzli Abdullah
          </p>
        </div>
      </div>

      {showAlert && (
        <div className="fixed bottom-4 right-4 animate-fade-in">
          <div className="bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            <p>{alertMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;