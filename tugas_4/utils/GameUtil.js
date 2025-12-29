export class GameUtil {
  static countCorrectWord({ challengeText, submittedText }) {
    const wordList = [];
    let firstIndex = 0;
    for (let i = 0; i < challengeText.length; i++) {
      if (challengeText[i] === ' ' && challengeText[i - 1] && challengeText[i + 1]) {
        const characterId = {
          start: firstIndex,
          end: i - 1
        }
        wordList.push(characterId);
        firstIndex = i + 1;
      } else if (i === challengeText.length - 1) {
        const characterId = {
          start: firstIndex,
          end: i
        }
        wordList.push(characterId);
      }
    }

    let totalCorrectWord = 0;
    let totalSubmittedWord = 0;

    for (let i = 0; i < wordList.length; i++) {
      const word = wordList[i];
      const challengeWord = challengeText.slice(word.start, word.end + 1);
      const submittedWord = submittedText.slice(word.start, word.end + 1);

      if (!submittedWord) break;

      totalSubmittedWord++;

      if (challengeWord === submittedWord) {
        totalCorrectWord++;
      }
    }

    return { totalCorrectWord, totalSubmittedWord };
  }

  static countWPM({ totalCorrectWord, timeInSecond }) {
    const wpm = Math.round((totalCorrectWord / timeInSecond) * 60);
    return Number.isNaN(wpm) ? 0 : wpm;
  }

  static countCharacterChecked({ challengeText, submittedText }) {
    let totalWrongCharacter = 0;
    let totalCharacterChecked = 0;

    for (let i = 0; i < submittedText.length; i++) {
      if (!challengeText[i]) break;
      if (challengeText[i] === ' ') continue;

      totalCharacterChecked++;
      if (submittedText[i] !== challengeText[i]) {
        totalWrongCharacter++;
      }
    }

    return { totalCharacterChecked, totalCorrectCharacter: totalCharacterChecked - totalWrongCharacter, totalWrongCharacter };
  }

  static countAccuracy({ totalCharacterChecked, totalWrongCharacter }) {
    const accuracy = ((totalCharacterChecked - totalWrongCharacter) / totalCharacterChecked) * 100;
    const roundedAccuracy = Math.round(accuracy);

    return Number.isNaN(roundedAccuracy) ? 0 : roundedAccuracy;
  }
}