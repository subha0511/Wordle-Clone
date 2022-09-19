import { useEffect, useState } from "react";

export const useKeyPress = () => {
  const [keyPressed, setKeyPressed] = useState("");

  function downHandler({ key }) {
    setKeyPressed(key);
  }

  function upHandler({ key }) {
    setKeyPressed("");
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("updown", upHandler);
    };
  }, []);
  return keyPressed;
};
