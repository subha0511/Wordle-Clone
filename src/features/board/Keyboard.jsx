import { StatusStates, actionTypes } from "./state";

const rowsLg = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

const rowsMb = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
  ["ENTER", "Backspace"],
];

function Keyboard({ currentKey, charactersTaken, dispatch }) {
  const onKeyPress = (value) => {
    if (value === "ENTER") {
      dispatch({ type: actionTypes.CHECK_WORD });
    } else if (value === "Backspace") {
      dispatch({ type: actionTypes.DELETE_ELEMENT });
    } else {
      dispatch({ type: actionTypes.ADD_ELEMENT, payload: value });
    }
  };

  return (
    <div className="grow mt-auto">
      <div className="md:hidden grid place-items-center gap-2">
        {rowsMb.map((row) => (
          <div className="flex items-center justify-center gap-2" key={row[0]}>
            {row.map((board_key) => (
              <div
                className={`py-2 px-2 rounded
              ${getStatusClassname(charactersTaken[board_key])}
              ${
                currentKey.toLowerCase() === board_key.toLowerCase()
                  ? "brightness-150"
                  : "brightness-100"
              }`}
                key={board_key}
                onClick={() => onKeyPress(board_key)}
              >
                {board_key}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="hidden md:grid place-items-center gap-2">
        {rowsLg.map((row) => (
          <div className="flex items-center justify-center gap-2" key={row[0]}>
            {row.map((board_key) => (
              <div
                className={`p-4 rounded cursor-pointer focus:brightness-150
              ${getStatusClassname(charactersTaken[board_key])}
              ${
                currentKey.toLowerCase() === board_key.toLowerCase()
                  ? "brightness-150"
                  : "brightness-100"
              }`}
                key={board_key}
                onClick={() => onKeyPress(board_key)}
              >
                {board_key}
              </div>
            ))}
          </div>
        ))}
      </div>
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
