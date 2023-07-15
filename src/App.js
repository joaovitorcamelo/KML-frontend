import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { Send } from './pages/Send';
import { Delete } from './pages/Delete';

function App() {

  return (
    <div className="mainDiv">
        <Routes>
          <Route path="" element={<Login/>}/>
          <Route path="main/:email" element={<Main/>}/>
          <Route path="send/:email" element={<Send/>}/>
          <Route path="delete/:email" element={<Delete/>}/>
        </Routes>
    </div>
  );
}

export default App;
