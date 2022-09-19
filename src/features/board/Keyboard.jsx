import { StatusStates } from "./state";

const rows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

function Keyboard({ currentKey, charactersTaken }) {
  return (
    <div className="grid place-items-center gap-2 mt-auto">
      {rows.map((row) => (
        <div className="flex gap-2" key={row[0]}>
          {row.map((board_key) => (
            <div
              className={`p-4 rounded
              ${getStatusClassname(charactersTaken[board_key])}
              ${
                currentKey.toLowerCase() === board_key.toLowerCase()
                  ? "brightness-150"
                  : "brightness-100"
              }`}
              key={board_key}
            >
              {board_key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const getStatusClassname = (status) => `
${
  (status ?? StatusStates.NOT_VISITED) === StatusStates.NOT_VISITED
    ? "bg-opacity-10 bg-gray-600 text-gray-100"
    : "bg-opacity-80"
} 
${status === StatusStates.NOT_FOUND ? "bg-gray-600 text-white" : ""}
${status === StatusStates.WRONG_POS ? "bg-yellow-500" : ""} 
${status === StatusStates.CORRECT_POS ? "bg-green-500" : ""}
`;

export default Keyboard;
