export default function algorithm2(words, wordLength, uniqueLetters) {
    const filteredWords = words.filter(word =>
        word.length === wordLength &&
        (!uniqueLetters || new Set(word).size === word.length)
    );

    if (filteredWords.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
}