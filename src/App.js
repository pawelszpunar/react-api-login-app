import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/Notfound';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AboutPage from './pages/AboutPage';
import Navigationbar from './pages/Navigationbar';

function App() {
  return (
    <div className="container">
        <Navigationbar/>
        <div className="mt-4">
          <Routes>
            <Route exact path="/" element={<Login/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/about" element={<AboutPage/>}/>
            <Route exact path="/dashboard" element={<Dashboard/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
