import { useEffect, useReducer } from "react";
import {
  initialState,
  actionTypes,
  boardReducer,
  StatusStates,
  BoardStates,
} from "./state";
import { useKeyPress } from "./hooks/useKeyPress";
import Keyboard from "./Keyboard";

function Board() {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const { board, charactersTaken, status } = state;

  const keyPressed = useKeyPress();

  useEffect(() => {
    if (status !== BoardStates.PENDING) {
      return;
    }
    if (
      keyPressed.length === 1 &&
      97 <= keyPressed.toLowerCase().charCodeAt(0) &&
      122 >= keyPressed.toLowerCase().charCodeAt(0)
    ) {
      dispatch({ type: actionTypes.ADD_ELEMENT, payload: keyPressed });
    } else if (keyPressed.toLowerCase() === "enter") {
      dispatch({ type: actionTypes.CHECK_WORD });
    } else if (keyPressed.toLowerCase() === "backspace") {
      dispatch({ type: actionTypes.DELETE_ELEMENT });
    }
  }, [keyPressed]);

  return (
    <div className="mx-auto ">
      <div className="grid place-items-center gap-2">
        {board?.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-5 gap-2 place-items-center"
          >
            {row.map((square, squareIndex) => (
              <Cell key={squareIndex} data={square} boardStatus={status} />
            ))}
          </div>
        ))}
      </div>
      <div className="pt-5">
        <Keyboard currentKey={keyPressed} charactersTaken={charactersTaken} />
      </div>
    </div>
  );
}

const Cell = ({ data, boardStatus }) => {
  const statusClassname = getStatusClassNames(data.status);

  return (
    <div
      className={`w-14 h-14 rounded-md grid place-items-center
      ${statusClassname}
      ${data.value !== "" ? "bounce-once border-gray-600" : "border-gray-800"}`}
    >
      <div
        className={`text-4xl font-medium duration-500 delay-300 ${
          boardStatus !== BoardStates.PENDING ? "scale-2 opacity-0" : ""
        }`}
      >
        {data.value}
      </div>
    </div>
  );
};

const getStatusClassNames = (status) => `
${
  status === StatusStates.NOT_VISITED
    ? "border bg-opacity-10 bg-gray-500 text-gray-300"
    : "bg-opacity-80"
} 
${status === StatusStates.NOT_FOUND ? "bg-gray-600" : ""}
${status === StatusStates.WRONG_POS ? "bg-yellow-500" : ""} 
${status === StatusStates.CORRECT_POS ? "bg-green-500" : ""}
`;

export default Board;
