import React from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { BoardStates, StatusStates } from "./state";
import dayjs from "dayjs";

function History() {
  const [history, setHistory] = useLocalStorage("history", []);
  return (
    <div className="">
      <div className="text-4xl font-bold text-gray-300 py-8">History</div>
      <div>
        {history?.length === 0 ? (
          <div className="text-gray-500 text-lg">No boards found...</div>
        ) : (
          <div className="grid grid-cols-3 gap-x-2 gap-y-5 place-items-center">
            {history.map((item) => (
              <HistoryCard data={item} key={item?.timeStamp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const HistoryCard = ({ data }) => {
  return (
    <div className="flex text-gray-300 max-h-fit">
      <div className="flex pr-1 md:pr-1.5">
        <div
          className={`rounded-full text-center ${
            data.status === BoardStates.FAILED ? "bg-red-500" : "bg-green-500"
          } p-[0.1875rem] md:p-1`}
        ></div>
      </div>
      <div className="flex flex-col gap-0.5 md:gap-1 pb-0.5">
        <div
          className={`text-sm font-medium md:text-xl md:leading-5 md:font-bold grid grid-cols-${data.size} place-items-stretch`}
        >
          {data.word?.split("")?.map((letter, index) => (
            <div key={index} className="text-center">
              {letter}
            </div>
          ))}
        </div>
        <div className="flex gap-0.5 md:gap-1 flex-col ">
          {data.board?.map((row, row_index) => (
            <div
              className={`grid grid-cols-${
                data.size ?? 5
              } gap-0.5 md:gap-1 place-items-center`}
              key={row_index}
            >
              {row?.map((cell, cell_index) => (
                <div
                  className={`h-2.5 w-2.5 md:h-5 md:w-5 md:rounded ${getStatusClassNames(
                    cell
                  )}`}
                  key={cell_index}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-400 text-right">
          {data?.timeStamp
            ? dayjs(data.timeStamp).format("HH:mm  D MMM, YY")
            : ""}
        </div>
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

export default History;