import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbar";
import Adopt from "./pages/Adopt";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage"
import {Route, Routes} from "react-router-dom";


function App() {
  return (
      <>
        <Navbar />
        <div className="pageContainer">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </>
  )
}
export default App;

