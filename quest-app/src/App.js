import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Auth from './components/Auth/Auth'; 

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path='/auth' Component={Auth} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
