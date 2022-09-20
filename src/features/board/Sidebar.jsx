import {
  FiRefreshCw,
  FiPlus,
  FiMinus,
  FiMenu,
  FiArrowLeft,
} from "react-icons/fi";
import { actionTypes } from "./state/actionTypes";

function Sidebar({ size, dispatch, isLoading, showHistory, toggleHistory }) {
  const resetState = () => dispatch({ type: actionTypes.RESET_WORD });
  const increaseSize = () => dispatch({ type: actionTypes.INCREASE_SIZE });
  const decreaseSize = () => dispatch({ type: actionTypes.DECREASE_SIZE });

  return (
    <div className="flex md:flex-col gap-2.5 pb-5 md:pb-0">
      <div className="rounded-full border border-gray-800 text-gray-300 p-1 flex justify-center">
        <div
          className={`rounded-full p-1.5 bg-white bg-opacity-0 duration-300 hover:bg-opacity-10 cursor-pointer ${
            isLoading ? "animate-spin" : ""
          }`}
          onClick={isLoading ? () => {} : resetState}
        >
          <FiRefreshCw size={20} />
        </div>
      </div>
      <div className="flex md:flex-col items-center rounded-full border border-gray-800 text-gray-300 p-1">
        <div
          className="rounded-full p-1.5 bg-white bg-opacity-0 duration-300 hover:bg-opacity-10 cursor-pointer"
          onClick={size < 7 ? increaseSize : () => {}}
        >
          <FiPlus className="" size={20} />
        </div>
        <div className="mx-auto px-1 font-xl text-center md:px-0 md:py-1">
          {size}
        </div>
        <div
          className="rounded-full p-1.5 bg-white bg-opacity-0 duration-300 hover:bg-opacity-10 cursor-pointer"
          onClick={size > 4 ? decreaseSize : () => {}}
        >
          <FiMinus className="" size={20} />
        </div>
      </div>
      <div className="rounded-full border border-gray-800 text-gray-300 p-1 flex justify-center">
        <div
          className={`rounded-full p-1.5 bg-white bg-opacity-0 duration-300 hover:bg-opacity-10 cursor-pointer `}
          onClick={toggleHistory}
        >
          {showHistory ? <FiArrowLeft size={20} /> : <FiMenu size={20} />}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
