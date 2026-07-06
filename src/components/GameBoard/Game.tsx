import { useEffect } from "react";

import Board from "./Board";
import Keyboard from "../Keyboard";

import { useGameStore } from "@/store/gameStore";

export default function Game() {
  const board = useGameStore((s) => s.board);
  const addLetter = useGameStore((s) => s.addLetter);
  const deleteLetter = useGameStore((s) => s.deleteLetter);
  const submitGuess = useGameStore((s) => s.submitGuess);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        submitGuess();
      } else if (event.key === "Backspace") {
        deleteLetter();
      } else if (/^[a-zA-Z]$/.test(event.key)) {
        addLetter(event.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <>
      <Board board={board} />

      <Keyboard onLetter={addLetter} onEnter={submitGuess} onBackspace={deleteLetter} />
    </>
  );
}
