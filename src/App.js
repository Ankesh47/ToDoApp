import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { closestCorners, DndContext } from '@dnd-kit/core'; // drag and drop
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, item, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="task-item" 
      {...attributes}
    >
      <button
        className="buttons"
        onClick={() => onDelete(id)}
      >
        -
      </button>
      <div className="task-content" {...listeners}>
        {item}
      </div>
    </div>
  );
}

function App() {
  const getInitialData = () => {
    const savedData = localStorage.getItem('toDoData');
    return savedData ? JSON.parse(savedData) : [];
  };

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  };

  const [task, setTask] = useState('');
  const [data, setData] = useState(getInitialData);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem('toDoData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changedata = (newTask) => {
    const newItem = { id: Date.now().toString(), task: newTask };
    setData((prevData) => [...prevData, newItem]);
  };

  const deletedata = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setData((prevData) => {
      const oldIndex = prevData.findIndex((item) => item.id === active.id);
      const newIndex = prevData.findIndex((item) => item.id === over.id);
      return arrayMove(prevData, oldIndex, newIndex);
    });
  };

  return (
    <div className="app">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="content">
        <div className="head">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              if (task.trim() !== '') {
                changedata(task);
                setTask('');
              }
            }}
          >
            <input
              type="text"
              className="addtodo"
              placeholder="Add task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="submit" type="submit">
              Add
            </button>
          </form>
        </div>

        <div className="middle">Tasks...</div>

        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
          <SortableContext items={data.map((item) => item.id)} strategy={verticalListSortingStrategy}>
            <div className="tasks">
              {data.map((item) => (
                <SortableItem 
                  key={item.id} 
                  id={item.id} 
                  item={item.task} 
                  onDelete={deletedata} 
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default App;