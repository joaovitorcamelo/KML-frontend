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
          <Route path="main/" element={<Main/>}/>
          <Route path="send/" element={<Send/>}/>
          <Route path="delete/" element={<Delete/>}/>
        </Routes>
    </div>
  );
}

export default App;
