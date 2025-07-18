import './App.css'
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import Modules from './components/Modules/Modules'
import Navbar from './components/Navbar/Navbar'
import Settings from './components/Settings/Settings'
import Test from './components/Test/Test'
import TaskManagement from './components/TaskManagement/TaskManagement'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<TaskManagement />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/test" element={<Test />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
