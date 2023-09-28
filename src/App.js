import React from 'react'
// import Menu from './Mycomponents/Menu'
// import Button from './Mycomponents/Button'
import Login from './Mycomponents/Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import Rotate from './Mycomponents/Rotate'
import Float from './Mycomponents/Float'
import { Table } from '@mui/material'
// import Log from './Mycomponents/Log'
function App() {
  return (
    <div>
      <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/float" element={<Float />} />
        <Route path="/table" element={<Table/>} />
      </Routes>
    </Router>
  </React.StrictMode>
      {/* <Float/> */}
      {/* <Menu/> */}
      {/* <Login/> */}
      {/* <Rotate/> */}
      {/* <Button/> */}
      {/* <Log/> */}
    </div>
  )
}

export default App
