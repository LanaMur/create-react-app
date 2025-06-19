// CV Generator App 
// Tech Stack: React + Bootstrap + Supabase + jsPDF
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './Register';
import CVGenerator from './CVGenerator';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import Header from "./Header";
import Dashboard from "./Dashboard";



function App() {
  return (
    <Container className="p-3" style={{ maxWidth: '375px' }}>
      <Header />
       <Routes>
        <Route path="/" element={<CVGenerator />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </Container>
  )
       
}

export default App;
