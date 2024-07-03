import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Restaurant/Home";
import Navbar from "./components/Restaurant/Navbar";
import Register from "./components/Restaurant/Register";
import Footer from "./components/Restaurant/Footer";
import Login from "./components/Restaurant/Login";


function App() {
  return (
    <>
      <Router>
        <Navbar />
       
        <Routes>
          
          <Route exact path="/" element={<Home />} ></Route>
          <Route exact path="/Restaurant/register" element={<Register />} ></Route>
          <Route exact path="/Restaurant/login" element={<Login />} ></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
