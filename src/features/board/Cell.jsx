import { BoardStates, StatusStates } from "./state";

const Cell = ({ data, boardStatus }) => {
  const statusClassname = getStatusClassNames(data.status);

  return (
    <div
      className={`w-10 h-10 md:w-14 md:h-14 rounded-md grid place-items-center
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

export default Cell;
