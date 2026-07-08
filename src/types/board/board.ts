import type { TileState } from "./tile";

export type BoardTile = {
  letter: string | null;
  state: TileState;
};

export type BoardProps = {
  board: BoardTile[][];
};
