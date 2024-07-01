import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/auth/register' element={<Register/>}></Route>
        <Route exact path='/auth/login' element={<Login/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
