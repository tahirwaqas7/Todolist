import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
// import './App.css'

function App() {


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100">
        <div className="">
          Your Todos
        </div>
      </div>
    </>
  )
}

export default App
