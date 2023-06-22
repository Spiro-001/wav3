export const toEmoji = (body) => {
  const emojis = {
    "<3": "❤️",
    ":)": "🙂",
    "=D": "😃",
    "(:dick)": "🍆",
    "(:butt)": "🍑",
  };
  let lengthOfEmoji = 0;
  let currentText = [];

  let word = [];
  for (let x = body.length - 1; x >= 0; x--) {
    word.unshift(body[x]);
    lengthOfEmoji++;
    if (emojis[word.join("")])
      return body.slice(0, body.length - lengthOfEmoji) + emojis[word.join("")];
  }

  if (emojis[currentText.join("")])
    return (
      body.slice(0, body.length - lengthOfEmoji) + emojis[currentText.join("")]
    );
  return body;
};
