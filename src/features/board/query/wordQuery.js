export const getRandomWord = async (size) => {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?length=${size}`
  );
  const data = await res.json();
  return data;
};
