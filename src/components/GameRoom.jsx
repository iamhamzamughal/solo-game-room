import React, { useEffect } from 'react';
import { useGame } from '../contexts/GameContext';

const GameRoom = () => {
  const {
    playerHand,
    botHands,
    turn,
    score,
    round,
    playedCards,
    shuffleAndDeal,
    playTurn,
    gameOver,
  } = useGame();

  useEffect(() => {
    shuffleAndDeal();
  }, []);

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-800 text-white'>
      <div className='mb-2'>Round: {round}</div>
      <div className='mb-2'>Score: {score}</div>
      <div className='mb-4'>Turn: {turn === 0 ? 'You' : `Bot ${turn}`}</div>

      <div className='mb-6'>
        <h2 className='text-xl mb-2'>Your Cards:</h2>
        <div className='flex gap-2'>
          {playerHand.map((card, i) => (
            <div
              key={i}
              className='p-4 bg-gray-600 rounded-lg cursor-pointer hover:bg-gray-500'
              onClick={() => playTurn(card)} // Call playTurn when a card is clicked
            >
              {card}
            </div>
          ))}
        </div>
      </div>

      <div className='mb-6'>
        <h2 className='text-xl mb-2'>Bots:</h2>
        <div className='flex gap-6'>
          {botHands.map((hand, i) => (
            <div key={i} className='flex flex-col items-center'>
              <p>Bot {i + 1}</p>
              <div className='p-4 bg-gray-700 rounded-lg'>{hand[0] || '?'}</div>
            </div>
          ))}
        </div>
      </div>

      <div className='mb-6'>
        <h2 className='text-xl mb-2'>Played Cards:</h2>
        <div className='flex gap-4'>
          {playedCards.map((play, i) => (
            <div key={i} className='p-2 bg-gray-500 rounded'>
              {play.player}: {play.card}
            </div>
          ))}
        </div>
      </div>

      {!gameOver ? (
        <button
          onClick={() => playTurn()}
          className='bg-green-600 px-4 py-2 rounded'
        >
          Play Turn
        </button>
      ) : (
        <div className='text-xl font-bold'>Game Over! Final Score: {score}</div>
      )}

      <button
        onClick={shuffleAndDeal}
        className='bg-red-500 px-4 py-2 rounded mt-4'
      >
        Restart Game
      </button>
    </div>
  );
};

export default GameRoom;
