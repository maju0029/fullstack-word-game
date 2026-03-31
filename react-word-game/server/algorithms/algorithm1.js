export default function algorithm1(correctWord, guessWord) {
    const correctArray = correctWord.split("");
    const guessArray = guessWord.split("");
    const result = [];
    const used = Array(correctArray.length).fill(false);

    for (let i = 0; i < guessArray.length; i++) {
        if (guessArray[i] === correctArray[i]) {
            result[i] = {
                letter: guessArray[i],
                result: "correct"
            };
            used[i] = true;
        }
    }

    for (let i = 0; i < guessArray.length; i++) {
        if (result[i]) continue;

        let found = false;

        for (let j = 0; j < correctArray.length; j++) {
            if (!used[j] && guessArray[i] === correctArray[j]) {
                found = true;
                used[j] = true;
                break;
            }
        }

        result[i] = {
            letter: guessArray[i],
            result: found ? "misplaced" : "incorrect"
        };
    }


    return result;
}