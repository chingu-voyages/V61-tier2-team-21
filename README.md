# Questle

<p align="center">
    <img width="411" height="135" alt="Questle Logo" style="" src="https://github.com/user-attachments/assets/9d107802-5ecb-4f7d-84ea-ec94170feadb" />
</p>
<br />
Guess the hidden word within a limited number of tries — each guess reveals which letters are correct, present, or absent from the answer.

## Features

- **Classic Wordle gameplay** — guess a hidden word within 6 tries, with tile-by-tile feedback (correct / present / incorrect)
- **On-screen keyboard** that updates letter colors after each guess to reflect what's been learned
- **Configurable word length** (4–6 letters) via game config
- **Game result modal** summarizing the outcome at the end of a round, with a share action
- **Toast notifications** for invalid guesses, wins, and losses
- **Responsive layout** that adapts to mobile viewport height

## Tech Stack

- **UI/UX Design:** Figma
- **Frontend:** React 19 + TypeScript, built with [Vite](https://vitejs.dev/) via [vite-plus](https://www.npmjs.com/package/vite-plus)
- **Styling:** Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com/) on top of Radix UI primitives
- **State management:** [Zustand](https://github.com/pmndrs/zustand)
- **Notifications:** [sonner](https://sonner.emilkowal.ski/)
- **Testing:** Vitest + React Testing Library (jsdom)
- **Package manager:** pnpm
- **Hosting:** Netlify

## Project Structure

```
src/
├── components/
│   ├── GameBoard/        # Board, Row, Tile — renders the guess grid
│   ├── Keyboard/         # On-screen keyboard
│   ├── GameResultsModal/ # End-of-game stats dialog
│   ├── Layout/           # Navbar, Footer, page shell
│   └── ui/               # shadcn-generated primitives (Button, Dialog, Toast)
├── pages/                # Landing / Playing / Finished — one per game phase
├── store/                # gameStore.ts — single Zustand store (phase, board, answer, guesses)
├── lib/                  # Pure, unit-testable game logic (gameLogic, createEmptyBoard, getRandomAnswer, tailwindUtils)
├── data/                 # constants.ts, word lists (wordles.json / nonwordles.json)
├── types/                # Shared TS types (board, game, keyboard)
├── hooks/                # useViewportHeight, etc.
└── test/                 # Vitest specs + jsdom setup
```

## Live Demo

🔗 [questle.netlify.app](https://questle.netlify.app/)

## Requirements

- Node.js `24.12.0` (see [`.nvmrc`](./.nvmrc))
- pnpm `11.9.0`

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/chingu-voyages/V61-tier2-team-21.git
   cd V61-tier2-team-21
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Start the dev server

   ```bash
   pnpm dev
   ```

4. Other useful scripts

   ```bash
   pnpm build    # type-check and build for production
   pnpm test     # run the Vitest suite
   pnpm lint     # lint the codebase
   ```

## Our Team

#### Product Owner

- Ademola Kujore: [GitHub](https://github.com/Dhemmyhardy) / [LinkedIn](https://linkedin.com/in/tundeademolakujore)

#### 📚 UI/UX Designer

- Tu Huynh: [GitHub](https://github.com/worktuhuynh1995-dot) / [LinkedIn](https://www.linkedin.com/in/tu-huynh-563b95257/)

#### 🔧 Web Developers

- Danim Kim (Tina) [GitHub](https://github.com/danimkim/) / [LinkedIn](https://www.linkedin.com/in/danimtinakim/)
- William East [GitHub](https://github.com/wjbetech) / [LinkedIn](https://www.linkedin.com/in/wjbetech/)
- Derek Barus [GitHub](https://github.com/barusdrk) / [LinkedIn](https://www.linkedin.com/in/derek-barus-5896b3233/)

## License

This project is licensed under the [MIT License](./LICENSE).
