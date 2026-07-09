# Roadmap — How to Read This Document

This roadmap has 3 levels:

- **Epics** — A major feature (like "Add keyboard")
- **User Stories** — What the player can do (like "Player can type letters")
- **Tasks** — What you need to code (like "Create a function that...")

For each step, you will see:

- **What to do** — The task
- **Why we need it** — The reason
- **How to know it works** — How to test it
- **Assignee** — Who is working on this task (empty = not assigned yet)
- **Difficulty** — S (small, ~30 min), M (medium, ~1-2 hours), L (large, ~half day)

**Important:** Do the phases in order. Phase 1 is first, then Phase 2, and so on. Some steps say "Do this first" — that means you must finish that step before starting this one.

---

## Already Done

- Phased gameplay (landing page -> game screen -> finished screen)
- Board grid (6 rows x 5 columns of tiles)
- Dynamic page routing: Landing, Playing, Finished
- Base Navbar and Footer layout components
- Word lists and game config (`wordles.json`, `nonwordles.json`, `constants.ts`)
- A basic zustand store
- On-screen keyboard (static, no styles or functionality)
- CSS color settings for game colors (green, yellow, gray)

---

## Phase 1: Get Ready

> **Do these tasks first.** You cannot start the game logic until these are done.

### Epic: Clean Up Old Code

Remove duplicates and dead code so the codebase is clean before building on top.

- [x] **Remove the duplicate keyboard layout**
  - **Assignee**: [Tina](https://github.com/danimkim)
  - **What to do:** We have two definitions of the keyboard layout (one in `constants.ts`, one in `keyboardLayout.ts`). Delete the one in `constants.ts` and keep `keyboardLayout.ts` as the only source.
  - **Why we need it:** Having two definitions causes confusion. If someone updates one but not the other, the game breaks.
  - **How to know it works:** Search the codebase for `KEYBOARD_ROWS` — it should only exist in `keyboardLayout.ts`.
  - **Files to change:** `src/data/constants.ts`, `src/components/Keyboard/keyboardLayout.ts`
  - **How long:** S (~15 min)

- [x] **Remove unused `KeyboardKey.tsx` file or make it work**
  - **Assignee**: [Tina](https://github.com/danimkim)
  - **What to do:** The file `KeyboardKey.tsx` exists but nothing uses it. Either delete it, or update `Keyboard.tsx` to use it.
  - **Why we need it:** Dead code confuses developers. When someone opens the project, they think this file is important but it is not used.
  - **How to know it works:** No unused component files in the `GameBoard` or `Keyboard` folders.
  - **Files to change:** `src/components/Keyboard/KeyboardKey.tsx` and/or `Keyboard.tsx`
  - **How long:** S (~15 min)

- [x] **Fix Tile colors to use CSS settings instead of hardcoded colors**
  - **Assignee**: [Tina](https://github.com/danimkim)
  - **What to do:** In `Tile.tsx`, replace `bg-green-500`, `bg-amber-400`, `bg-gray-500` with the CSS settings from `index.css` (`--game-correct`, `--game-present`, `--game-absent`). Build additional colors for empty slots in both light and dark themes.
  - **Why we need it:** The designer set specific colors in the CSS file. If we use hardcoded colors, changing the design later means editing many files instead of one.
  - **How to know it works:** Tiles show the correct green, yellow, and gray colors. Changing the color in `index.css` changes the tile colors automatically.
  - **Files to change:** `src/components/GameBoard/Tile.tsx`
  - **How long:** S (~15 min)

- [x] **Fix a React warning about missing keys**
  - **Assignee**: [Tina](https://github.com/danimkim)
  - **What to do:** In `Board.tsx`, add `key={i}` to the `<div>` inside the `.map()` loop.
  - **Why we need it:** React needs a unique ID for each item in a list. Without it, React shows a warning in the browser console and might not update the screen correctly.
  - **How to know it works:** Open the browser console — no warning messages about "keys".
  - **Files to change:** `src/components/GameBoard/Board.tsx`
  - **How long:** S (~5 min)

### Epic: Add Testing Tools

We need a way to test our code automatically. Currently there are no tests.

- [x] **Migrate project to Vite+**
  - **Assignee:** [Will](https://github.com/wjbetech), [Tina](https://github.com/danimkim)
  - **What to do:** Run the commands [here](https://viteplus.dev/guide/migrate) to migrate vite to vite+.
  - **Why we need it:** Vite+ adds a number of automatic checks and tests and overall enhances the experience developing with vite.
  - **How to know it works:** You should be able to use `vp ...` commands to run vite+ functionality.
  - **Files to change:** `package.json`
  - **How long:** S (~5-10 min)
- [x] **Install testing libraries**
  - **Assignee**: [Will](https://github.com/wjbetech), [Tina](https://github.com/danimkim)
  - **What to do:** Run `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
  - **Why we need it:** We need tools to write and run tests. Tests check that our code works correctly and prevent bugs.
  - **How to know it works:** The packages appear in `package.json` under `devDependencies`.
  - **Files to change:** `package.json`
  - **How long:** S (~10 min)

- [x] **Add a "test" command to package.json**
  - **Assignee**: [Will](https://github.com/wjbetech), [Tina](https://github.com/danimkim)
  - **What to do:** Add `"test": "vitest"` to the `scripts` section in `package.json`.
  - **Why we need it:** This lets us run tests with `pnpm test`.
  - **How to know it works:** Running `pnpm test` does not give an error (even with no tests yet).
  - **Files to change:** `package.json`
  - **How long:** S (~2 min)

- [x] **Set up vitest configuration**
  - **Assignee**: [Will](https://github.com/wjbetech), [Tina](https://github.com/danimkim)
  - **What to do:** Add a `test` section to `vite.config.ts` with `jsdom` environment. Create `src/test/setup.ts` that imports `@testing-library/jest-dom`.
  - **Why we need it:** Vitest needs to know how to run tests. `jsdom` simulates a browser so we can test React components.
  - **How to know it works:** `pnpm test` starts the test runner without errors.
  - **Files to change:** `vite.config.ts`, `src/test/setup.ts` (new)
  - **How long:** S (~15 min)

### Epic: Add Game State to the Store

The store currently only knows about the screen (landing/playing/finished). We need to add game data.

- [x] **Add game state fields to the store**
  - **Assignee**: [Will](<(https://github.com/wjbetech)>)
  - **What to do:** Add these fields to the store and to the `GameStore` type in `gamePhases.ts`:
    - `answer: string` — the word the player needs to guess (empty string at start)
    - `board: BoardTile[][]` — the 6x5 grid of tiles (empty at start)
    - `currentRow: number` — which row the player is typing in (0 at start)
    - `gameResult: 'win' | 'lose' | null` — did the player win, lose, or is the game still going? (null at start)
    - `guessedLetters: Record<string, TileState>` — which letters the player has used and their best color (for keyboard coloring)
  - **Why we need it:** The store is the brain of our game. Right now it only knows about screens. It needs to also know the word, the board, and the game result.
  - **How to know it works:** The store has all these fields. TypeScript shows no errors in `gameStore.ts` or `gamePhases.ts`.
  - **Files to change:** `src/store/gameStore.ts`, `src/types/game/gamePhases.ts`
  - **Do this first:** Code cleanup tasks above must be done
  - **How long:** M (~1 hour)

---

## Phase 2: Game Rules

> **Write the rules of the game.** These are plain JS/TS functions which can be built into `/lib`. No React code here. We can test them easily.

### User Story: The game picks a word for today

- [x] **Create a function that picks today's word**
  - **Assignee**: [Will](https://github.com/wjbetech)
  - **What to do:** Create `getDailyWord()` in a new file `src/lib/dailyWord.ts`. It should:
    1. Get today's date (year, month, day)
    2. Convert it to a number (like days since Jan 1, 2000)
    3. Divide that number by the total number of words in `wordles.json` and take the remainder
    4. Use that number to pick a word from the list
  - **Why we need it:** Every player on the same day should get the same word. The next day, they get a different word.
  - **How to know it works:**
    - Calling `getDailyWord()` twice on the same day returns the same word
    - Calling it on different days returns different words (usually)
  - **Files to change:** `src/lib/dailyWord.ts` (new)
  - **How long:** S (~30 min)

- [x] **Write tests for `getDailyWord`**
  - **Assignee**: [Will](https://github.com/wjbetech)
  - **What to do:** Create `src/lib/dailyWord.test.ts`. Write tests that:
    - Mock the date to a fixed value and check the word
    - Mock a different date and check the word is different
  - **Why we need it:** We need to make sure the word changes every day but stays the same on the same day.
  - **How to know it works:** All tests pass with `pnpm test`.
  - **Files to change:** `src/lib/dailyWord.test.ts` (new)
  - **How long:** S (~20 min)

### User Story: The player's guess is checked

- [x] **Create a function that checks if a word is a valid guess**
  - **Assignee**: [Will](https://github.com/wjbetech)
  - **What to do:** Create `validateGuess(guess, wordLength)` in a new file `src/lib/gameLogic.ts`. It should return `true` or `false`:
    1. Check if the guess has exactly `wordLength` letters (default 5)
    2. Check if the guess is in our word list (`validGuesses`)
  - **Why we need it:** When the player presses Enter, we need to know if their word is allowed. "HELLO" (5 letters, real word) is allowed. "XYZZY" (not a real word) is not allowed.
  - **How to know it works:** Write tests in `gameLogic.test.ts`:
    - "HELLO" → `true` (5 letters, in word list)
    - "HI" → `false` (too short)
    - "HELLOO" → `false` (too long)
    - "XYZZY" → `false` (not in word list)
    - "" (empty) → `false`
  - **Files to change:** `src/lib/gameLogic.ts` (new), `src/lib/gameLogic.test.ts` (new)
  - **How long:** S (~30 min)

- [x] **Create a function that compares the guess to the answer**
  - **Assignee**: [Will](https://github.com/wjbetech)
  - **What to do:** Create `compareGuess(guess, answer)` in `src/lib/gameLogic.ts`. It returns an array of 5 tile states:
    - `'correct'` — right letter, right position (green tile)
    - `'present'` — right letter, wrong position (yellow tile)
    - `'incorrect'` — letter not in the answer (gray tile)
  - **Why we need it:** This is the core of Wordle. The player needs to see which letters are correct and which are not.
  - **How to know it works:** Write tests in `gameLogic.test.ts`:
    - Guess "CRANE" vs answer "CRANE" → all 5 are `'correct'`
    - Guess "HELLO" vs answer "WORLD" → correct mix of states
    - Guess "AAAAA" vs answer "BBBBB" → all 5 are `'incorrect'`
  - **Files to change:** `src/lib/gameLogic.ts`, `src/lib/gameLogic.test.ts`
  - **How long:** M (~1 hour)

- [x] **Make sure duplicate letters work correctly**
  - **Assignee**: [Will](https://github.com/wjbetech)
  - **What to do:** Update `compareGuess` to handle words with repeated letters. The rule is: each letter in the answer can only be matched once.
  - **Why we need it:** Imagine the answer is "LEVEL" and the player guesses "ALLEY":
    - Position 0: "A" is not in "LEVEL" → gray
    - Position 1: "L" is in "LEVEL" but at position 0, not position 1 → yellow
    - Position 2: "L" — there is only one "L" left in "LEVEL" (it was already used at position 1's match), so this "L" → gray
    - Position 3: "E" is in "LEVEL" but at positions 1 and 3, not position 3 → green (it IS at position 3)
    - Position 4: "Y" is not in "LEVEL" → gray
  - **How to know it works:** Write tests:
    - "ALLEY" vs "LEVEL" → `[gray, yellow, gray, green, gray]`
    - "EERIE" vs "EERIE" → all green
    - "EERIE" vs "REPLY" → correct states
  - **Files to change:** `src/lib/gameLogic.ts`, `src/lib/gameLogic.test.ts`
  - **Do this first:** The basic `compareGuess` function must exist
  - **How long:** M (~45 min)

- [ ] **Create a function that builds the keyboard colors**
  - **Assignee**: [Will](https://github.com/wjbetech)
  - **What to do:** Create `updateGuessedLetters(oldGuesses, newGuess, newStates)` in `src/lib/gameLogic.ts`. It updates the keyboard letter colors after each guess.
  - **Why we need it:** The keyboard shows which letters the player has used. A letter should keep its best color:
    - If a letter was yellow, and becomes green in a later guess → it shows green
    - If a letter was green, and appears gray in a later guess → it stays green (never downgrades)
    - Priority: green > yellow > gray
  - **How to know it works:** Write tests:
    - Letter "A" was gray, new guess makes it yellow → "A" becomes yellow
    - Letter "B" was yellow, new guess makes it green → "B" becomes green
    - Letter "C" was green, new guess makes it yellow → "C" stays green
  - **Files to change:** `src/lib/gameLogic.ts`, `src/lib/gameLogic.test.ts`
  - **How long:** M (~45 min)

---

## Phase 3: The Game Works

> **Wire everything together.** After this phase, the player can play the game from start to finish.

### User Story: The game starts when the player clicks Play

- [ ] **Create an `initGame()` function in the store**
  - **Assignee**: []
  - **What to do:** Add `initGame()` to `gameStore.ts`. It should:
    1. Call `getDailyWord()` to pick today's word
    2. Set `answer` to that word
    3. Reset `board` to an empty 6x5 grid
    4. Set `currentRow` to 0
    5. Set `gameResult` to null
    6. Clear `guessedLetters`
  - **Why we need it:** Before the player starts, we need to pick the word and clear the board.
  - **How to know it works:** After calling `initGame()`, the store has a word in `answer` and an empty board.
  - **Files to change:** `src/store/gameStore.ts`
  - **Do this first:** Phase 2 must be done (we need `getDailyWord`)
  - **How long:** S (~20 min)

- [ ] **Call `initGame()` when the player clicks Play**
  - **Assignee**: []
  - **What to do:** Update `startGame()` in `gameStore.ts` to call `initGame()` before changing the screen to "playing".
  - **Why we need it:** When the player clicks Play, the game needs to pick a word and reset the board.
  - **How to know it works:** Click "Play" on the landing page. The game screen shows an empty board. The store has a word in `answer`.
  - **Files to change:** `src/store/gameStore.ts`
  - **How long:** S (~5 min)

- [ ] **Update `Game.tsx` to use the store instead of its own state**
  - **Assignee**: []
  - **What to do:** Remove all `useState` calls from `Game.tsx` for `board`, `answer`, and `currentRow`. Instead, read these from the store using `useGameStore`:
    - `const board = useGameStore((s) => s.board)`
    - `const answer = useGameStore((s) => s.answer)`
    - `const currentRow = useGameStore((s) => s.currentRow)`
  - **Why we need it:** The store should be the "brain" of the game. If `Game.tsx` has its own state, it can get out of sync with the store.
  - **How to know it works:** `Game.tsx` has no `useState` for game data. The board still renders correctly.
  - **Files to change:** `src/components/GameBoard/Game.tsx`
  - **How long:** S (~20 min)

### User Story: The player can type letters on the board

- [ ] **Create an `addLetter(letter)` function in the store**
  - **Assignee**: []
  - **What to do:** Add `addLetter` to `gameStore.ts`. It should:
    1. Check if `currentRow` is not full (less than 5 letters typed)
    2. If yes: add the letter to the current row, set that tile's state to `'filled'`
    3. If no: do nothing (row is full)
  - **Why we need it:** When the player types or clicks a letter, it should appear on the board.
  - **How to know it works:**
    - Type 5 letters → all 5 appear in the row
    - Type a 6th letter → nothing happens (row is full)
    - Each tile shows the letter
  - **Files to change:** `src/store/gameStore.ts`
  - **How long:** S (~20 min)

- [ ] **Create a `removeLetter()` function in the store**
  - **Assignee**: []
  - **What to do:** Add `removeLetter` to `gameStore.ts`. It should:
    1. Check if the current row has letters
    2. If yes: remove the last letter, set that tile's state back to `'empty'`
    3. If no: do nothing (row is empty)
  - **Why we need it:** When the player presses Backspace, the last letter should disappear.
  - **How to know it works:**
    - Type 3 letters, press Backspace → only 2 letters remain
    - Press Backspace on an empty row → nothing happens
  - **Files to change:** `src/store/gameStore.ts`
  - **How long:** S (~15 min)

- [ ] **Connect the on-screen keyboard to the store**
  - **Assignee**: []
  - **What to do:** Update `Keyboard.tsx` and `Game.tsx` so that clicking a letter calls `addLetter`, clicking Backspace calls `removeLetter`. The keyboard should read `guessedLetters` from the store to show colors (Phase 4 adds the actual colors).
  - **Why we need it:** The player needs to use the on-screen keyboard to type.
  - **How to know it works:** Click letters on the screen → they appear on the board. Click Backspace → last letter disappears.
  - **Files to change:** `src/components/Keyboard/Keyboard.tsx`, `src/components/GameBoard/Game.tsx`
  - **How long:** S (~20 min)

### User Story: The player can submit a guess

- [ ] **Create a `submitGuess()` function in the store (basic version)**
  - **Assignee**: []
  - **What to do:** Add `submitGuess` to `gameStore.ts`. It should:
    1. Get the word the player typed (from the current row)
    2. Check if all 5 letters are filled. If not, show an error in the console for now (Phase 4 adds a nice message)
    3. Check if the word is valid using `validateGuess`. If not, show an error in the console
    4. If valid: use `compareGuess` to get the tile states
    5. Update the board with those tile states (green/yellow/gray)
    6. Update `guessedLetters` using `updateGuessedLetters`
    7. Increase `currentRow` by 1
  - **Why we need it:** This is the main action in the game. When the player presses Enter, their guess is checked and the board updates.
  - **How to know it works:**
    - Type a valid word, press Enter → tiles get colors, next row becomes active
    - Type an invalid word, press Enter → error in console (Phase 4 adds a nice message)
  - **Files to change:** `src/store/gameStore.ts`
  - **Do this first:** Phase 2 must be done (`validateGuess`, `compareGuess`, `updateGuessedLetters`)
  - **How long:** M (~1 hour)

- [ ] **Connect Enter key to `submitGuess()`**
  - **Assignee**: []
  - **What to do:** Update `Game.tsx` and `Keyboard.tsx` so pressing Enter (or clicking Enter on the on-screen keyboard) calls `submitGuess()`.
  - **Why we need it:** The player needs a way to submit their guess.
  - **How to know it works:** Type a word, press Enter → guess is submitted.
  - **Files to change:** `src/components/GameBoard/Game.tsx`, `src/components/Keyboard/Keyboard.tsx`
  - **How long:** S (~10 min)

### User Story: The game knows when the player wins or loses

- [ ] **Add win detection to `submitGuess()`**
  - **Assignee**: []
  - **What to do:** After updating the board with tile states, check if all 5 tiles in the current row are `'correct'`. If yes:
    1. Set `gameResult` to `'win'`
    2. Call `finishGame()` to move to the finished screen
  - **Why we need it:** The game needs to know when the player guesses the word correctly.
  - **How to know it works:** Guess the correct word → game moves to the finished screen. Store shows `gameResult === 'win'`.
  - **Files to change:** `src/store/gameStore.ts`
  - **How long:** S (~15 min)

- [ ] **Add lose detection to `submitGuess()`**
  - **Assignee**: []
  - **What to do:** After increasing `currentRow`, check if `currentRow >= MAX_GUESSES` (6). If yes:
    1. Set `gameResult` to `'lose'`
    2. Call `finishGame()` to move to the finished screen
  - **Why we need it:** The game needs to know when the player runs out of guesses.
  - **How to know it works:** Make 6 wrong guesses → game moves to the finished screen. Store shows `gameResult === 'lose'`.
  - **Files to change:** `src/store/gameStore.ts`
  - **How long:** S (~15 min)

### User Story: The player can use their physical keyboard

- [ ] **Create a `useKeyboard()` hook**
  - **Assignee**: []
  - **What to do:** Create `src/hooks/useKeyboard.ts`. It should:
    1. Add a listener for key presses on the document
    2. When a letter key (a-z) is pressed: call `addLetter(letter)`
    3. When Backspace is pressed: call `removeLetter()`
    4. When Enter is pressed: call `submitGuess()`
    5. Only listen when the game is in the "playing" phase
    6. Remove the listener when the component unmounts
  - **Why we need it:** Players want to use their real keyboard, not just click on screen.
  - **How to know it works:** Focus the game, type letters on your keyboard → they appear on the board. Press Backspace → last letter disappears. Press Enter → guess is submitted.
  - **Files to change:** `src/hooks/useKeyboard.ts` (new)
  - **How long:** S (~30 min)

- [ ] **Use the keyboard hook in the Playing page**
  - **Assignee**: []
  - **What to do:** In `src/pages/Playing/index.tsx`, call `useKeyboard()` at the top of the component. Remove the debug "End Game" button.
  - **Why we need it:** The hook needs to be used somewhere to work. The Playing page is the right place.
  - **How to know it works:** On the game screen, your physical keyboard works.
  - **Files to change:** `src/pages/Playing/index.tsx`
  - **How long:** S (~5 min)

### User Story: The player sees the game result

- [ ] **Show the result on the Finished screen**
  - **Assignee**: [Tina](https://github.com/danimkim)
  - **What to do:** Read `gameResult` from the store in `Finished/index.tsx`. Show:
    - "You won!" if `gameResult === 'win'`
    - "You lost!" if `gameResult === 'lose'`
  - **Why we need it:** The player needs to know if they won or lost.
  - **How to know it works:** Win the game → "You won!" appears. Lose the game → "You lost!" appears.
  - **Files to change:** `src/pages/Finished/index.tsx`
  - **How long:** S (~15 min)

- [ ] **Show the answer on the Finished screen**
  - **Assignee**: []
  - **What to do:** Read `answer` from the store. Show it on the Finished screen (for both win and lose).
  - **Why we need it:** If the player loses, they want to know what the word was. If they win, it is nice to see the word again.
  - **How to know it works:** Finish a game → the word is shown on the screen.
  - **Files to change:** `src/pages/Finished/index.tsx`
  - **How long:** S (~5 min)

- [ ] **Show how many guesses it took on win**
  - **Assignee**: []
  - **What to do:** Read `currentRow` from the store. On win, show "You guessed it in X tries" where X is `currentRow + 1` (because currentRow starts at 0).
  - **Why we need it:** Players want to know how good they were.
  - **How to know it works:** Win in 3 guesses → "You guessed it in 3 tries" appears.
  - **Files to change:** `src/pages/Finished/index.tsx`
  - **How long:** S (~10 min)

### Epic: Make sure input is clean

- [ ] **Convert all letters to uppercase**
  - **Assignee**: []
  - **What to do:** In `addLetter`, convert the letter to uppercase before adding it to the board. Also in `useKeyboard`, convert `event.key` to uppercase before calling `addLetter`.
  - **Why we need it:** The player might type lowercase letters on their keyboard. We want everything to be uppercase so matching works correctly.
  - **How to know it works:** Type lowercase "a" on your keyboard → it shows as "A" on the board.
  - **Files to change:** `src/store/gameStore.ts`, `src/hooks/useKeyboard.ts`
  - **How long:** S (~10 min)

- [ ] **Lock input after the game ends**
  - **Assignee**: []
  - **What to do:** In `addLetter`, `removeLetter`, and `submitGuess`, check if `gameResult` is not null. If the game is over, do nothing.
  - **Why we need it:** After the player wins or loses, they should not be able to keep typing.
  - **How to know it works:** Win or lose the game → typing still works but does not change the board.
  - **Files to change:** `src/store/gameStore.ts`
  - **How long:** S (~10 min)

---

## Phase 4: Make It Look and Feel Good

> **The game works, but it needs polish.** Add colors, animations, and error messages here.

### User Story: The keyboard shows which letters were used

- [ ] **Add colors to the on-screen keyboard**
  - **Assignee**: []
  - **What to do:** In `Keyboard.tsx`, read `guessedLetters` from the store. For each key, check if the letter is in `guessedLetters`. If yes:
    - `correct` → green background
    - `present` → yellow background
    - `incorrect` → gray background
  - **Why we need it:** The player needs to see which letters they already used and what color they were.
  - **How to know it works:** Guess "CRANE" with answer "CRATE" → C, R, A are green, E is yellow, N is gray. The keyboard shows these colors.
  - **Files to change:** `src/components/Keyboard/Keyboard.tsx`
  - **How long:** M (~45 min)

### User Story: The player gets feedback on invalid guesses

- [ ] **Add a toast notification for errors**
  - **Assignee**: []
  - **What to do:** Install a toast component (or use a simple one). Show a message at the top of the screen when:
    - The row is not full: "Not enough letters"
    - The word is not in the list: "Not in word list"
  - **Why we need it:** Right now, invalid guesses just show an error in the console. The player needs to see a message on the screen.
  - **How to know it works:** Type 3 letters and press Enter → "Not enough letters" appears. Type "XYZZY" and press Enter → "Not in word list" appears. Message disappears after a few seconds.
  - **Files to change:** New toast component or use shadcn toast, `src/store/gameStore.ts` (add error state)
  - **How long:** M (~1 hour)

- [ ] **Add a shake animation when the guess is invalid**
  - **Assignee**: []
  - **What to do:** Add a CSS animation called `shake` in `index.css`. When the guess is invalid, add a `shake` class to the current row for 500ms, then remove it.
  - **Why we need it:** The shake tells the player "that guess is not allowed" in a visual way.
  - **How to know it works:** Type an invalid word, press Enter → the row shakes left and right.
  - **Files to change:** `src/index.css`, `src/components/GameBoard/Board.tsx` or `Game.tsx`
  - **How long:** S (~30 min)

### User Story: Tiles animate when the player types and submits

- [ ] **Add a pop animation when a letter is placed**
  - **Assignee**: []
  - **What to do:** Add a CSS animation called `pop` in `index.css`. When a letter is added to a tile, the tile briefly scales up then back to normal.
  - **Why we need it:** This makes typing feel responsive and satisfying.
  - **How to know it works:** Type a letter → the tile "pops" (gets slightly bigger for a moment).
  - **Files to change:** `src/index.css`, `src/components/GameBoard/Tile.tsx`
  - **How long:** S (~30 min)

- [ ] **Add a flip animation when tiles reveal their colors**
  - **Assignee**: []
  - **What to do:** Add a CSS animation called `flip` in `index.css`. When a guess is submitted, each tile in the row flips one by one (delay each tile by a bit, like 100ms, 200ms, 300ms). The flip reveals the color.
  - **Why we need it:** This is the signature Wordle animation. It builds suspense as each letter is revealed.
  - **How to know it works:** Submit a valid guess → tiles flip one by one, left to right, each showing its color.
  - **Files to change:** `src/index.css`, `src/components/GameBoard/Tile.tsx`, `src/components/GameBoard/Board.tsx`
  - **How long:** M (~1 hour)

- [ ] **Lock input during the flip animation**
  - **Assignee**: []
  - **What to do:** Add an `isAnimating` flag to the store. Set it to `true` when the flip starts, and `false` when it ends. In `addLetter`, `removeLetter`, and `submitGuess`, do nothing if `isAnimating` is `true`.
  - **Why we need it:** While tiles are flipping, the player should not be able to type. Otherwise, the board can get confused.
  - **How to know it works:** Submit a guess → during the flip animation, typing does nothing.
  - **Files to change:** `src/store/gameStore.ts`, `src/components/GameBoard/Board.tsx`
  - **How long:** M (~30 min)

---

## Phase 5: Daily Game, Sharing, and Polish

> **Make the game work as a daily challenge.** The player can only play once per day, share their result, and learn how to play.

### User Story: The game remembers who has played today

- [ ] **Create localStorage helper functions**
  - **Assignee**: []
  - **What to do:** Create `src/utils/storage.ts` with these functions:
    - `getLastPlayedDate()` — reads the last played date from localStorage, returns a Date or null
    - `setLastPlayedDate(date)` — saves the date to localStorage
    - `getLastGameResult()` — reads the last result ('win' or 'lose' or null)
    - `setLastGameResult(result)` — saves the result
  - **Why we need it:** We need to remember if the player already played today so we can show a message instead of the game.
  - **How to know it works:** Call `setLastPlayedDate(new Date())`, then call `getLastPlayedDate()` → it returns the same date.
  - **Files to change:** `src/utils/storage.ts` (new)
  - **How long:** S (~20 min)

- [ ] **Save the game result when the game ends**
  - **Assignee**: []
  - **What to do:** In `submitGuess()` in the store, when the player wins or loses, call `setLastPlayedDate(new Date())` and `setLastGameResult(gameResult)`.
  - **Why we need it:** We need to remember the player finished today so we can stop them from playing again.
  - **How to know it works:** Win a game → check localStorage in browser dev tools → `lastPlayedDate` is today.
  - **Files to change:** `src/store/gameStore.ts`
  - **How long:** S (~10 min)

### User Story: The player cannot play twice in one day

- [ ] **Block the landing page if already played today**
  - **Assignee**: []
  - **What to do:** In `Landing/index.tsx`, on load:
    1. Call `getLastPlayedDate()`
    2. Compare it to today's date
    3. If they already played today: hide the Play button, show "Come back tomorrow!" instead
    4. If not: show the Play button as normal
  - **Why we need it:** Wordle is a daily game. The player should only be able to play once per day.
  - **How to know it works:** Play a game → go back to landing → you see "Come back tomorrow!" instead of Play. Come back the next day → you see Play again.
  - **Files to change:** `src/pages/Landing/index.tsx`
  - **How long:** M (~30 min)

- [ ] **Add a countdown timer to midnight**
  - **Assignee**: []
  - **What to do:** When the landing page is locked (player already played), show a countdown timer that counts down to midnight. Update every second. Format as "HH:MM:SS".
  - **Why we need it:** The player wants to know exactly when they can play again.
  - **How to know it works:** After playing, the landing page shows a timer counting down to midnight.
  - **Files to change:** `src/pages/Landing/index.tsx`
  - **How long:** S (~20 min)

### User Story: The player can share their result

- [ ] **Create a function that builds the share text**
  - **Assignee**: []
  - **What to do:** Create `buildShareText(board, gameResult, guessCount)` in `src/lib/shareText.ts`. It creates text like:

    ```
    Questle 3/6

    🟩🟩🟩🟩🟩
    🟨⬜⬜🟨⬜
    🟩🟩🟩🟩🟩
    ```

    - Use 🟩 for correct, 🟨 for present, ⬜ for incorrect or empty
    - First line is the game name and score (e.g., "Questle 3/6" = solved in 3 of 6 guesses)
    - For a loss, show "X/6"

  - **Why we need it:** Players love to share their results with friends.
  - **How to know it works:** Play a game, call the function → it returns correctly formatted text with emojis.
  - **Files to change:** `src/lib/shareText.ts` (new)
  - **How long:** S (~30 min)

- [ ] **Connect the Share button to the clipboard**
  - **Assignee**: []
  - **What to do:** In `Finished/index.tsx`, when the player clicks Share:
    1. Call `buildShareText()` with the board, result, and guess count
    2. Copy the text to clipboard using `navigator.clipboard.writeText()`
    3. Show a confirmation message like "Copied to clipboard!"
  - **Why we need it:** The player needs to paste their result somewhere (like Discord or Twitter).
  - **How to know it works:** Click Share → paste in a text editor → the emoji grid appears.
  - **Files to change:** `src/pages/Finished/index.tsx`
  - **How long:** S (~20 min)

### User Story: The landing page explains the game

- [ ] **Add a short description on the landing page**
  - **Assignee**: []
  - **What to do:** Below the title "Questle", add a short sentence like "Guess the word in 6 tries. A new puzzle every day."
  - **Why we need it:** New players need to know what the game is.
  - **How to know it works:** The landing page shows the title and a description.
  - **Files to change:** `src/pages/Landing/index.tsx`
  - **How long:** S (~10 min)

- [ ] **Add a word length selector on the landing page**
  - **Assignee**: []
  - **What to do:** Add buttons for "4 letters", "5 letters", "6 letters" on the landing page. Clicking a button calls `setWordLength()` in the store. The currently selected button is highlighted.
  - **Note:** We only have 5-letter words right now. The "4 letters" and "6 letters" buttons should be disabled and show "Coming soon".
  - **Why we need it:** The store supports different word lengths, but the player needs a way to choose.
  - **How to know it works:** Click "5 letters" → it highlights. The "4" and "6" buttons are disabled and cannot be clicked.
  - **Files to change:** `src/pages/Landing/index.tsx`
  - **How long:** M (~30 min)

### User Story: The player can learn how to play

- [ ] **Create a "How to Play" modal**
  - **Assignee**: []
  - **What to do:** Create a modal component in `src/components/HowToPlay/index.tsx`. It should include:
    - Rules: "Guess the word in 6 tries"
    - Color guide: "Green = right letter, right spot. Yellow = right letter, wrong spot. Gray = letter not in word"
    - An example guess with colored tiles
  - **Why we need it:** New players need to learn how the game works.
  - **How to know it works:** Open the modal → it shows the rules and examples clearly.
  - **Files to change:** `src/components/HowToPlay/index.tsx` (new), use shadcn Dialog
  - **How long:** M (~1 hour)

- [ ] **Add a button to open the modal in the navbar**
  - **Assignee**: []
  - **What to do:** Wire the info icon in the navbar to open the "How to Play" modal.
  - **Why we need it:** The player needs a way to open the instructions.
  - **How to know it works:** Click the info icon in the navbar → the modal opens.
  - **Files to change:** `src/components/Layout/Navbar.tsx`
  - **How long:** S (~15 min)

- [ ] **Show the "How to Play" modal on first visit**
  - **Assignee**: []
  - **What to do:** Check localStorage for a flag like `hasSeenInstructions`. If it is not set, show the modal automatically when the landing page loads. After the player closes the modal, set the flag so it never shows automatically again.
  - **Why we need it:** New players should see the instructions without having to look for them.
  - **How to know it works:** First visit → modal opens automatically. Close it, refresh → modal does not open automatically. Click info icon → modal opens.
  - **Files to change:** `src/pages/Landing/index.tsx`, `src/utils/storage.ts`
  - **How long:** S (~20 min)

---

## Order Summary

1. **Phase 1** (Get Ready) — Clean up code, add testing tools, add game state to store
2. **Phase 2** (Game Rules) — Write the game logic functions with tests
3. **Phase 3** (The Game Works) — Wire everything together. The game is now playable.
4. **Phase 4** (Make It Look Good) — Add colors, animations, and error messages
5. **Phase 5** (Daily Game & Polish) — Daily reset, sharing, instructions

**Important:** Phases 1, 2, and 3 must be done in order. You cannot start Phase 2 before Phase 1 is done, and you cannot start Phase 3 before Phase 2 is done.

Phases 4 and 5 can be done at the same time after Phase 3 is done. But some Phase 5 tasks need Phase 4 tasks to be done first (for example, sharing needs the Finished screen to be done).

---

## Future Features (Not in MVP)

These are not needed for the MVP but are good ideas for later:

- **Statistics tracking** — Show games played, win %, current streak, max streak
- **Hard mode** — The player must use the letters they already guessed correctly
- **Dark mode** — A dark theme for the game (CSS settings already exist, just need to be used)
- **4-letter and 6-letter word lists** — So the word length selector has real options
- **Animations on the finished screen** — Confetti on win
