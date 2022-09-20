export const StatusStates = {
  NOT_VISITED: "NOT_VISITED",
  NOT_FOUND: "NOT_FOUND",
  CORRECT_POS: "CORRECT_POS",
  WRONG_POS: "WRONG_POS",
};

export const BoardStates = {
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

export const createBoard = (size) =>
  Array(size + 1)
    .fill(null)
    .map(() =>
      Array(size)
        .fill(null)
        .map(() => ({
          value: "",
          status: StatusStates.NOT_VISITED,
        }))
    );

export const initialState = {
  size: 5,
  board: createBoard(5),
  activeRow: 0,
  activeCol: 0,
  word: "",
  status: BoardStates.PENDING,
  charactersTaken: {},
};
