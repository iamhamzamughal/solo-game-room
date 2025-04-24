import { createContext, useContext, useState } from 'react';
import { supabase } from '../services/SupabaseClient';

// Game Context
const GameContext = createContext();
export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [playerHand, setPlayerHand] = useState([]);
  const [botHands, setBotHands] = useState([[], [], []]);
  const [turn, setTurn] = useState(0);
  const [score, setScore] = useState(0);
  const [playedCards, setPlayedCards] = useState([]);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const shuffleAndDeal = () => {
    const deck = ['🂡', '🂢', '🂣', '🂤', '🂥', '🂦'];
    const shuffled = deck.sort(() => 0.5 - Math.random());
    setPlayerHand(shuffled.slice(0, 2));
    setBotHands([
      shuffled.slice(2, 3),
      shuffled.slice(3, 4),
      shuffled.slice(4, 5),
    ]);
    setPlayedCards([]);
    setTurn(0);
    setScore(0);
    setRound(1);
    setGameOver(false);
  };

  const playTurn = (selectedCard) => {
    if (turn === 0) {
      // Player plays the selected card
      const played = selectedCard;
      setPlayerHand(playerHand.filter((card) => card !== played)); // Remove the played card from player's hand
      setPlayedCards([...playedCards, { player: 'You', card: played }]);
    } else {
      const botCard = botHands[turn - 1][0];
      const newBots = botHands.map((hand, idx) =>
        idx === turn - 1 ? [] : hand
      ); // Empty bot's card after playing it
      setBotHands(newBots);
      setPlayedCards([
        ...playedCards,
        { player: `Bot ${turn}`, card: botCard },
      ]);
    }

    // After all 4 players play, process round
    if (playedCards.length === 3) {
      setTimeout(() => {
        const randomWinner = Math.floor(Math.random() * 4);
        if (randomWinner === 0) setScore((s) => s + 1);
        setPlayedCards([]);
        setRound((r) => r + 1);
        if (round >= 5) {
          setGameOver(true);
          storeResult();
        }
      }, 1000);
    }

    // Move to the next player
    setTurn((prev) => (prev + 1) % 4);
  };

  const storeResult = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('Failed to get user:', userError);
      return;
    }

    const { error } = await supabase
      .from('game_history')
      .insert([
        { user_id: user.id, score, date_played: new Date().toISOString() },
      ]);

    if (error) {
      console.error('Insert error:', error.message);
    }
  };

  return (
    <GameContext.Provider
      value={{
        playerHand,
        botHands,
        turn,
        score,
        round,
        playedCards,
        shuffleAndDeal,
        playTurn,
        gameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
