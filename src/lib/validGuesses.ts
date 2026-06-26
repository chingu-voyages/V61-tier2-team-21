import wordles from "../data/wordles.json";
import nonwordles from "../data/nonwordles.json";

const validGuesses = [...wordles, ...nonwordles].sort();

export default validGuesses;
