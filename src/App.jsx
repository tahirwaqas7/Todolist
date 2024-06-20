import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
// import './App.css'
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, settodo] = useState("");

  const [todos, settodos] = useState([]);

  const handleEdit = (e, id) => {
    let t = todos.filter(i => id === id);
    settodo(t[0].todo);
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newTodos);
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
  }

  const handleChange = (e) => {
    settodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];

    newTodos[index].isCompleted = !newTodos[index].isCompleted;

    settodos(newTodos);
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input type="text" className='w-1/2' onChange={handleChange} value={todo} />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>Save</button>
        </div>

        <h2 className='text-lg font-bold'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {

            return (
              <div key={item.id} className="todo flex w-1/4 my-3 justify-between">

                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} id='' />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>

                </div>

                <div className="buttons">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>

                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
