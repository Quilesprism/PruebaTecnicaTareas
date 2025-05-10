import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router"
import ListarTareas from './pages/TareasPage'
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
            <Route path="/" element={<ListarTareas />} />
           
      </Routes>
      </BrowserRouter>
  )
}

export default App
