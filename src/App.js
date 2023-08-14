import logo from './logo.svg';
import './App.css';
import MainPage from './components/MainPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />}/>   
      </Routes>
    </div>
  );
}

export default App;
