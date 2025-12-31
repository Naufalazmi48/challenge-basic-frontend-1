export class GameUtil {
  static countCharacter({ challengeText, submittedText }) {
    let totalCorrectCharacter = 0;
    let totalSubmittedCharacter = 0;
    
    for (let i = 0; i < submittedText.length; i++) {
      if (!challengeText[i]) break;

      totalSubmittedCharacter++;

      if (challengeText[i] === submittedText[i]) {
        totalCorrectCharacter++;
      }
    }

    return { totalCorrectCharacter, totalSubmittedCharacter, totalWrongCharacter: totalSubmittedCharacter - totalCorrectCharacter };
  }

  static countWPM({ totalCorrectCharacter, timeInSecond }) {
    const wpm = Math.floor((totalCorrectCharacter / 5) * (60 / timeInSecond));
    return Number.isNaN(wpm) ? 0 : wpm;
  }

  static countAccuracy({ totalCharacterChecked, totalWrongCharacter }) {
    const accuracy = ((totalCharacterChecked - totalWrongCharacter) / totalCharacterChecked) * 100;
    const roundedAccuracy = Math.floor(accuracy);

    return Number.isNaN(roundedAccuracy) ? 0 : roundedAccuracy;
  }
}