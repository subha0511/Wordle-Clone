import { StatusStates, BoardStates } from "./states";
import { actionTypes } from "./actionTypes";

export const boardReducer = (state, action) => {
  switch (action.type) {
    //ADD CHARACTER
    case actionTypes.ADD_ELEMENT: {
      const { activeRow, activeCol, size, board } = state;
      let newBoard = [...board];
      if (activeCol === size || activeRow === size + 1) {
        return { ...state };
      }
      newBoard[activeRow][activeCol].value = action.payload.toUpperCase();
      return { ...state, board: newBoard, activeCol: activeCol + 1 };
    }

    //DELETE LAST ELEMENT
    case actionTypes.DELETE_ELEMENT: {
      const { activeRow, activeCol, size, board } = state;
      let newBoard = [...board];
      if (activeCol === 0 || activeRow === size + 1) {
        return { ...state };
      }
      newBoard[activeRow][activeCol - 1].value = "";
      return { ...state, board: newBoard, activeCol: activeCol - 1 };
    }

    //CHECK FOR STRING EQUALITY
    case actionTypes.CHECK_WORD: {
      const {
        activeRow,
        activeCol,
        size,
        board,
        word,
        charactersTaken,
        status,
      } = state;

      if (activeCol !== size || activeRow === size + 1) {
        return { ...state };
      }

      const newBoard = [...board];
      newBoard[activeRow].forEach((element) => {
        element.status = StatusStates.NOT_FOUND;
        if (
          (charactersTaken[element.value] ?? StatusStates.NOT_VISITED) ===
          StatusStates.NOT_VISITED
        ) {
          charactersTaken[element.value] = StatusStates.NOT_FOUND;
        }
      });

      let taken = new Set();
      for (let i = 0; i < 5; i++) {
        if (newBoard[activeRow][i].value === word[i]) {
          taken.add(i);
          newBoard[activeRow][i].status = StatusStates.CORRECT_POS;
          charactersTaken[word[i]] = StatusStates.CORRECT_POS;
        }
      }

      for (let i = 0; i < 5; i++) {
        if (taken.has(i)) {
          continue;
        }
        for (let j = 0; j < 5; j++) {
          if (taken.has(j)) {
            continue;
          }
          if (board[activeRow][i].value === word[j]) {
            board[activeRow][i].status = StatusStates.WRONG_POS;
            if (charactersTaken[word[j]] !== StatusStates.CORRECT_POS) {
              charactersTaken[word[j]] = StatusStates.WRONG_POS;
            }
            break;
          }
        }
      }
      let currentStatus = status;

      const currentWord = board[activeRow].map((item) => item.value).join("");
      if (currentWord === word) {
        currentStatus = BoardStates.SUCCESS;
      } else if (activeRow === size) {
        currentStatus = BoardStates.FAILED;
      }

      return {
        ...state,
        board: newBoard,
        activeRow: activeRow + 1,
        activeCol: 0,
        status: currentStatus,
        charactersTaken,
      };
    }
  }
};
