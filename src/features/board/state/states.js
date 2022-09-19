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

export const initialState = {
  size: 5,
  board: Array(6)
    .fill(null)
    .map(() =>
      Array(5)
        .fill(null)
        .map(() => ({
          value: "",
          status: StatusStates.NOT_VISITED,
        }))
    ),
  activeRow: 0,
  activeCol: 0,
  word: "STAND",
  status: BoardStates.PENDING,
  charactersTaken: {},
};
