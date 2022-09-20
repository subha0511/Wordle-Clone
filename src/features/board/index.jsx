import { useEffect, useReducer, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { initialState, actionTypes, boardReducer, BoardStates } from "./state";
import { useKeyPress, useLocalStorage } from "./hooks";
import { getRandomWord } from "./query/wordQuery";
import Keyboard from "./Keyboard";
import Cell from "./Cell";
import Sidebar from "./Sidebar";
import History from "./History";

function Board() {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const [history, setHistory] = useLocalStorage("history", []);
  const [showHistory, setShowHistory] = useState(false);

  const toggleShowHistory = () => setShowHistory((prev) => !prev);

  const { board, charactersTaken, status, size, word } = state;

  const { isFetching } = useQuery(["word", size], () => getRandomWord(size), {
    enabled: word.length !== size,
    onSuccess: (data) =>
      dispatch({ type: actionTypes.SET_WORD, payload: data[0] }),
  });

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

  useEffect(() => {
    if (status === BoardStates.PENDING) {
      return;
    }
    const currentBoard = {
      word,
      size,
      status,
      timeStamp: dayjs(),
      board: board.map((row) => row.map((cell) => cell.status)),
    };
    let newHistory = history;
    newHistory.unshift(currentBoard);
    setHistory(newHistory);
  }, [status]);

  return (
    <div className="mx-auto flex flex-col-reverse h-full p-5 md:p-8 md:flex-row items-center md:justify-center">
      <div className="w-full md:w-1/2 md:min-h-screen">
        {showHistory ? (
          <History />
        ) : (
          <>
            <div className="grid place-items-center gap-2">
              {board?.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`grid grid-cols-${size} gap-2 place-items-center`}
                >
                  {row.map((square, squareIndex) => (
                    <Cell
                      key={squareIndex}
                      data={square}
                      boardStatus={status}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="pt-5">
              <Keyboard
                currentKey={keyPressed}
                charactersTaken={charactersTaken}
                dispatch={dispatch}
              />
            </div>
          </>
        )}
      </div>
      <Sidebar
        size={size}
        dispatch={dispatch}
        isLoading={isFetching}
        showHistory={showHistory}
        toggleHistory={toggleShowHistory}
      />
    </div>
  );
}

export default Board;
