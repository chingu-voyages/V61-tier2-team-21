import wordles from "./wordles.json";
import nonwordles from "./nonwordles.json";

const validGuesses = [...wordles, ...nonwordles].sort();

export default validGuesses;
