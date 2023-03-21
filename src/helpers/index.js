export const getTokenApi = async () => {
  const api = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await api.json();
  return data;
};

export const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
    // if (arr.includes('False') && arr.includes('True')) {
    //   arr = ['True', 'False'];
    // }
  }
  return arr;
};

export const getQuestions = async (token) => {
  const api = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await api.json();
  return data;
};
