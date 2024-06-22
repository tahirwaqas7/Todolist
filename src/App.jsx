import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { LuClipboardEdit } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import Navbar from './components/Navbar';
import Popup from './components/Popup';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const savedTodos = JSON.parse(todoString);
      setTodos(savedTodos);
    }
  }, []);

  const handleEdit = (id) => {
    const editedTodo = todos.find(item => item.id === id);
    if (editedTodo) {
      setTodo(editedTodo.todo);
      const newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveToLocalStorage(newTodos);
    }
  }

  const handleDelete = (id) => {
    setTodoToDelete(id);
    setIsPopupOpen(true);
  }

  const confirmDelete = () => {
    if (todoToDelete) {
      const newTodos = todos.filter(item => item.id !== todoToDelete);
      setTodos(newTodos);
      saveToLocalStorage(newTodos);
    }
    closePopup();
  }

  const closePopup = () => {
    setIsPopupOpen(false);
    setTodoToDelete(null);
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  }

  const handleAdd = () => {
    if (!todo.trim()) return;
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLocalStorage(newTodos);
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (id) => {
    const index = todos.findIndex(item => item.id === id);
    if (index !== -1) {
      const newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos);
      saveToLocalStorage(newTodos);
    }
  }

  const saveToLocalStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  return (
    <>
      <Navbar />
      <div className="md:container my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[40%] md:mx-auto mx-5">
        <h1 className='font-semibold capitalize text-center text-xl'>iTask - manage your Todos at one place</h1>

        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>

          <div className="flex gap-2">
            <input type="text" className='w-full outline-none rounded-md p-1 px-3' onChange={handleChange} value={todo} onKeyDown={(e) => (e.key === "Enter" ? handleAdd() : null)} />

            <button onClick={handleAdd} disabled={todo.length <= 0} className='bg-violet-800 hover:bg-violet-950 p-4 py-2 mx-2 disabled:bg-violet-600 text-sm font-bold text-white rounded-md '>Save</button>
          </div>

        </div>

        <input type="checkbox" onChange={toggleFinished} checked={showFinished} />

        <label className='mx-2' htmlFor="show">Show Finished</label>

        <div className='h-[1px] bg-purple-600 opacity-15 w-[80%] mx-auto my-3'></div>

        <h2 className='text-lg font-bold flex justify-center'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}

          {todos.map(item => (
            (showFinished || !item.isCompleted) && (

              <div key={item.id} className="todo flex md:w-full my-3 justify-between p-3 h-full bg-[#fff] rounded-lg bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-60 border border-slate-300 gap-x-1">

                <div className='flex gap-5'>
                  <input name={item.id} onChange={() => handleCheckbox(item.id)} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through text-gray-700 font-semibold" : ""}>{item.todo}</div>
                </div>

                <div className="buttons flex h-full">

                  <button onClick={() => handleEdit(item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-2 font-bold text-white rounded-md mx-1 text-lg '><LuClipboardEdit /></button>

                  <button onClick={() => handleDelete(item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-2 text-lg font-bold text-white rounded-md mx-1'><MdDeleteSweep /></button>
                </div>

              </div>

            )
          ))}

        </div>
      </div>

      {isPopupOpen && <Popup isOpen={isPopupOpen} onClose={closePopup} onConfirmDelete={confirmDelete} />}

    </>
  );
}

export default App;
