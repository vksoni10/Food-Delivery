import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Restaurant/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/frontend/src/components/Restaurant/Home.js"
            element={<Home />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
