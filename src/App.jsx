import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import GameRoom from './components/GameRoom';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/game' element={<GameRoom />} />
        </Routes>
      </Router>
    </GameProvider>
  );
}

export default App;
