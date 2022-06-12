module.exports = (tp) => {
  function is_or_are(text) {
    let last_char = '';
    for (word of text.split(" ")) {
      last_char = word[word.length - 1];
      if (last_char === "s" || last_char === 'S')
        return 'are';
    }

    return 'is';
  }

  return {
    is_or_are,
  }
}