import { useEffect, useState } from 'react';

import Board from './Board';
import Keyboard from '../Keyboard';

import type { BoardTile } from '../../types/board/board';

import wordles from '../../data/wordles.json';
import validGuesses from '../../lib/validGuesses';

interface GameProps {
  rows?: number;
  wordLength?: number;
}

const createEmptyBoard = (rows: number, wordLength: number): BoardTile[][] =>
  Array.from({ length: rows }, () =>
    Array.from({ length: wordLength }, () => ({
      letter: null,
      state: 'empty' as const,
    })),
  );

export default function Game({ rows = 6, wordLength = 5 }: GameProps) {
  const [board, setBoard] = useState<BoardTile[][]>(() =>
    createEmptyBoard(rows, wordLength),
  );

  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [answer] = useState(() =>
    wordles[Math.floor(Math.random() * wordles.length)].toUpperCase(),
  );

  const handleLetter = (letter: string) => {
    if (gameOver || currentCol >= wordLength) return;

    setBoard((prev) => {
      const next = prev.map((row) => row.map((tile) => ({ ...tile })));

      next[currentRow][currentCol] = {
        letter,
        state: 'filled',
      };

      return next;
    });

    setCurrentCol((c) => c + 1);
  };

  const handleBackspace = () => {
    if (gameOver || currentCol === 0) return;

    setBoard((prev) => {
      const next = prev.map((row) => row.map((tile) => ({ ...tile })));

      next[currentRow][currentCol - 1] = {
        letter: null,
        state: 'empty',
      };

      return next;
    });

    setCurrentCol((c) => c - 1);
  };

  const handleEnter = () => {
    if (gameOver) return;

    if (currentCol !== wordLength) return;

    const guess = board[currentRow]
      .map((tile) => tile.letter)
      .join('')
      .toUpperCase();

    if (!validGuesses.includes(guess.toLowerCase())) {
      alert('Not in word list');
      return;
    }

    setBoard((prev) => {
      const next = prev.map((row) => row.map((tile) => ({ ...tile })));

      const remaining = answer.split('');
      const states: BoardTile['state'][] = Array(wordLength).fill('incorrect');

      for (let i = 0; i < wordLength; i++) {
        if (guess[i] === answer[i]) {
          states[i] = 'correct';
          remaining[i] = '';
        }
      }

      for (let i = 0; i < wordLength; i++) {
        if (states[i] === 'correct') continue;

        const index = remaining.indexOf(guess[i]);

        if (index !== -1) {
          states[i] = 'present';
          remaining[index] = '';
        } else {
          states[i] = 'incorrect';
        }
      }

      for (let i = 0; i < wordLength; i++) {
        next[currentRow][i].state = states[i];
      }

      return next;
    });

    if (guess === answer) {
      setGameOver(true);
      alert('You win!');
      return;
    }

    if (currentRow === rows - 1) {
      setGameOver(true);
      alert(`Game over! Answer: ${answer}`);
      return;
    }

    setCurrentRow((r) => r + 1);
    setCurrentCol(0);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleEnter();
      } else if (event.key === 'Backspace') {
        handleBackspace();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        handleLetter(event.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <>
      <Board board={board} />

      <Keyboard
        onLetter={handleLetter}
        onEnter={handleEnter}
        onBackspace={handleBackspace}
      />
    </>
  );
}
