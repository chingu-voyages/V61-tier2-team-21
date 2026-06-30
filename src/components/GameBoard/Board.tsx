import React from "react";
import Tile from "./Tile";
import type { BoardProps, BoardTile } from "../../types/board/board";

const Row = React.memo(({ tiles }: { tiles: BoardTile[] }) => {
  return (
    <div className="flex flex-row gap-1">
      {tiles.map((tile, i) => (
        <Tile key={i} letter={tile.letter} state={tile.state} />
      ))}
    </div>
  );
});

Row.displayName = "Row";

const Board = React.memo(({ board }: BoardProps) => {
  return (
    <div className="flex flex-col gap-1">
      {board.map((row, i) => (
        <div key={i} className="gap-y-1">
          <Row tiles={row} />
        </div>
      ))}
    </div>
  );
});

Board.displayName = "Board";

export default Board;
