export type TileState = "empty" | "filled" | "correct" | "present" | "incorrect";

export type TileProps = {
  letter: string | null;
  state: TileState;
  // something here for the mexican wave effect
};