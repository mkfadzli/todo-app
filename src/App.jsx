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
      { id: 1, text: "Doa di Multazam", completed: false },
      { id: 2, text: "Doa di Hijr Ismail", completed: false },
      { id: 3, text: "Doa di Hajar Aswad", completed: false },
      { id: 4, text: "Doa di Raudhah", completed: false },
      { id: 5, text: "Doa smg diampunkan segala2 dosa2, dosa2 lampau, dosa2 yg masih lg belum dpt ditinggalkan sepenuhnya, dan dosa2 akan datang", completed: false },
      { id: 6, text: "Doa diberi kesihatan yg baik, jauh dari smemua penyakit kritikal berbahaya", completed: false },
      { id: 7, text: "Doa dipanjangkan umur, dijauhkan dari buruknya hari tua, dan mendapat pengakhiran yg baik", completed: false },
      { id: 8, text: "Doa dikurniakan rezeki anak2 yg soleh solehah yg bijak2 yg cantik2 handsome2", completed: false },
      { id: 9, text: "Doa diluaskan rezeki, dibukakan segala pintu rezeki dari semua sumber ", completed: false },
      { id: 10, text: "Doa diterima segala amalan kebajikan ", completed: false },
      { id: 11, text: "Doa dipermudahkan segala urusan dunia dan akhirat ", completed: false },
      { id: 12, text: "Doa semoga segala impian, cita2 target tercapai", completed: false },
      { id: 13, text: "Doa diberi kebahagian dan ketenangan hidup dengan keluarga, rakan2 dan org sekeliling ", completed: false },
      { id: 14, text: "Doa dikurniakan ramai sahabat, kenalan yg baik2 ", completed: false },
      { id: 15, text: "Doa dijauhkan dari hasad dengki makhluk ", completed: false },
      { id: 16, text: "Doa dijauhkan dari kejahatan manusia dan jin serta makhluk halus lain ", completed: false },
      { id: 17, text: "Doa smg dapat keluar dari belenggu hutang ", completed: false },
      { id: 18, text: "Doa smg dapat membuka perniagaan sendiri, franschise ", completed: false },
      { id: 19, text: "Doa smg nama dapat dikeluarkan dari senarai hitam keluar negara, smg diberi rezeki utk datang umrah dan haji tahun hadapan ", completed: false },
      { id: 20, text: "Doa smg dapt memiliki kereta idaman, motor idaman, tercapai segala kehendak ", completed: false },
      { id: 21, text: "Doa smg diangkatkan darjat, dipandang mulia oleh masyarakat ", completed: false },
      { id: 22, text: "Doa diluaskan rezeki, dibukakan segala pintu rezeki dari semua sumber, tercapai segala hajat. ", completed: false },
      { id: 23, text: "Doa smg selamat dari siksaan azab kubur dan hitungan di padang mahsyar. ", completed: false },
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
    showNotification("Doa updated!");
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
            Written in Java by Fadzli Abdullah
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