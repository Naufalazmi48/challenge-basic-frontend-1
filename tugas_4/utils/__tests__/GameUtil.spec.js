import assert from 'assert';
import { GameUtil } from '../GameUtil.js';

console.info('=========================================== GameUtil.countCorrectWord =============================================');
(() => {
  // Test GameUtil.countCorrectWord Case A

  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = 'Lalu Naufal Azmi';

    const expectedCorrectWord = 3;
    const expectedSubmittedWord = 3;
    const expectedResult = { totalCorrectWord: expectedCorrectWord, totalSubmittedWord: expectedSubmittedWord };
    // When
    const result = GameUtil.countCorrectWord({ challengeText, submittedText });
    // Then
    assert.deepStrictEqual(result, expectedResult);
    console.info(`Test GameUtil.countCorrectWord Case A: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCorrectWord Case A: Failed`);
  }
})();

(() => {
  // Test GameUtil.countCorrectWord Case B

  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = 'La luNaufal Azmi';

    const expectedCorrectWord = 2;
    const expectedSubmittedWord = 3;
    const expectedResult = { totalCorrectWord: expectedCorrectWord, totalSubmittedWord: expectedSubmittedWord };
    // When
    const result = GameUtil.countCorrectWord({ challengeText, submittedText });
    // Then
    assert.deepStrictEqual(result, expectedResult);
    console.info(`Test GameUtil.countCorrectWord Case B: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCorrectWord Case B: Failed`);
  }
})();

(() => {
  // Test GameUtil.countCorrectWord Case C

  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = 'La luNaufal';

    const expectedCorrectWord = 1;
    const expectedSubmittedWord = 2;
    const expectedResult = { totalCorrectWord: expectedCorrectWord, totalSubmittedWord: expectedSubmittedWord };
    // When
    const result = GameUtil.countCorrectWord({ challengeText, submittedText });
    // Then
    assert.deepStrictEqual(result, expectedResult);
    console.info(`Test GameUtil.countCorrectWord Case C: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCorrectWord Case C: Failed`);
  }
})();

(() => {
  // Test GameUtil.countCorrectedWord when there isn't submitted text

  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = '';

    const expectedCorrectWord = 0;
    const expectedSubmittedWord = 0;
    const expectedResult = { totalCorrectWord: expectedCorrectWord, totalSubmittedWord: expectedSubmittedWord };
    // When
    const result = GameUtil.countCorrectWord({ challengeText, submittedText });
    // Then
    assert.deepStrictEqual(result, expectedResult);
    console.info(`Test GameUtil.countCorrectedWord when there isn't submitted text: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCorrectedWord when there isn't submitted text: Failed`);
  }
})();

(() => {
  // Test GameUtil.countCorrectedWord when user submitted many white space

  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = 'Lalu na  ufal  a zmi';

    const expectedCorrectWord = 1;
    const expectedSubmittedWord = 3;
    const expectedResult = { totalCorrectWord: expectedCorrectWord, totalSubmittedWord: expectedSubmittedWord };
    // When
    const result = GameUtil.countCorrectWord({ challengeText, submittedText });
    // Then
    assert.deepStrictEqual(result, expectedResult);
    console.info(`Test GameUtil.countCorrectedWord when user submitted many white space: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCorrectedWord when user submitted many white space: Failed`);
  }
})();

console.info('\n=========================================== GameUtil.countWPM =============================================');
(() => {
  // Test GameUtil.countWPM should return correct WPM when time is 60 seconds
  try {
    // Given
    const totalCorrectWord = 40;
    const timeInSecond = 60;

    const expectedWPM = 40;

    // When
    const result = GameUtil.countWPM({ totalCorrectWord, timeInSecond });

    // Then
    assert.strictEqual(result, expectedWPM);
    console.info(`Test GameUtil.countWPM should return correct WPM when time is 60 seconds: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countWPM should return correct WPM when time is 60 seconds: Failed`);
  }
})();

(() => {
  // Test GameUtil.countWPM should return correct WPM when time is under 60 seconds
  try {
    // Given
    const totalCorrectWord = 40;
    const timeInSecond = 40;

    const expectedWPM = 60;

    // When
    const result = GameUtil.countWPM({ totalCorrectWord, timeInSecond });

    // Then
    assert.strictEqual(result, expectedWPM);
    console.info(`Test GameUtil.countWPM should return correct WPM when time is under 60 seconds: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countWPM should return correct WPM when time is under 60 seconds: Failed`);
  }
})();

(() => {
  // Test GameUtil.countWPM should return correct WPM when time is more than 60 seconds
  try {
    // Given
    const totalCorrectWord = 40;
    const timeInSecond = 100;

    const expectedWPM = 24;

    // When
    const result = GameUtil.countWPM({ totalCorrectWord, timeInSecond });

    // Then
    assert.strictEqual(result, expectedWPM);
    console.info(`Test GameUtil.countWPM should return correct WPM when time is more than 60 seconds: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countWPM should return correct WPM when time is more than 60 seconds: Failed`);
  }
})();

(() => {
  // Test GameUtil.countWPM should return not NaN when timeInSecond is 0
  try {
    // Given
    const totalCorrectWord = 0;
    const timeInSecond = 0;

    const expectedWPM = 0;

    // When
    const result = GameUtil.countWPM({ totalCorrectWord, timeInSecond });

    // Then
    assert.strictEqual(result, expectedWPM);
    console.info(`Test GameUtil.countWPM should not return NaN when timeInSecond is 0: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countWPM should not return NaN when timeInSecond is 0: Failed`);
  }
})();

console.info('\n=========================================== GameUtil.countCharacterChecked =============================================');
(() => {
  // Test GameUtil.countCharacterChecked should return correct character checked when submitted text is correct
  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = 'Lalu Naufal A';

    const expectedCharacterChecked = {
      totalCharacterChecked: 11,
      totalCorrectCharacter: 11,
      totalWrongCharacter: 0
    };

    // When
    const result = GameUtil.countCharacterChecked({ challengeText, submittedText });

    // Then
    assert.deepStrictEqual(result, expectedCharacterChecked);
    console.info(`Test GameUtil.countCharacterChecked should return correct character checked when submitted text is correct: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCharacterChecked should return correct character checked when submitted text is correct: Failed`);
  }
})();

(() => {
  // Test GameUtil.countCharacterChecked should return correct character checked when submitted text is wrong
  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = 'LalutNaufaltAzmi';

    const expectedCharacterChecked = {
      totalCharacterChecked: 14,
      totalCorrectCharacter: 14,
      totalWrongCharacter: 0
    };

    // When
    const result = GameUtil.countCharacterChecked({ challengeText, submittedText });

    // Then
    assert.deepStrictEqual(result, expectedCharacterChecked);
    console.info(`Test GameUtil.countCharacterChecked should ignoring check white space in challenge text when count accuracy: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCharacterChecked should ignoring check white space in challenge text when count accuracy: Failed`);
  }
})();

(() => {
  // Test GameUtil.countCharacterChecked should return correct character checked when submitted text is wrong
  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = 'LalaiNaufalazmiiii';

    const expectedCharacterChecked = {
      totalCharacterChecked: 14,
      totalCorrectCharacter: 10,
      totalWrongCharacter: 4
    };

    // When
    const result = GameUtil.countCharacterChecked({ challengeText, submittedText });

    // Then
    assert.deepStrictEqual(result, expectedCharacterChecked);
    console.info(`Test GameUtil.countCharacterChecked should return correct character checked when submitted text is wrong: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCharacterChecked should return correct character checked when submitted text is wrong: Failed`);
  }
})();

console.info('\n=========================================== GameUtil.countAccuracy =============================================');
(() => {
  // Test GameUtil.countAccuracy should return correct accuracy when submitted text is correct
  try {
    // Given
    const characterChecked = {
      totalCharacterChecked: 10,
      totalCorrectCharacter: 10,
      totalWrongCharacter: 0
    };

    const expectedAccuracy = 100;

    // When
    const result = GameUtil.countAccuracy(characterChecked);

    // Then
    assert.strictEqual(result, expectedAccuracy);
    console.info(`Test GameUtil.countAccuracy should return correct accuracy when submitted text is correct: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countAccuracy should return correct accuracy when submitted text is correct: Failed`);
  }
})();

(() => {
  // Test GameUtil.countAccuracy should return correct accuracy when submitted text is wrong
  try {
    // Given
    const characterChecked = {
      totalCharacterChecked: 25,
      totalCorrectCharacter: 23,
      totalWrongCharacter: 2
    };

    const expectedAccuracy = 92;

    // When
    const result = GameUtil.countAccuracy(characterChecked);

    // Then
    assert.strictEqual(result, expectedAccuracy);
    console.info(`Test GameUtil.countAccuracy should return correct accuracy when submitted text is wrong: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countAccuracy should return correct accuracy when submitted text is wrong: Failed`);
  }
})();

(() => {
  // Test GameUtil.countAccuracy should not return NaN
  try {
    // Given
    const characterChecked = {
      totalCharacterChecked: 0,
      totalCorrectCharacter: 0,
      totalWrongCharacter: 0
    };

    const expectedAccuracy = 0;

    // When
    const result = GameUtil.countAccuracy(characterChecked);

    // Then
    assert.strictEqual(result, expectedAccuracy);
    console.info(`Test GameUtil.countAccuracy should not return NaN: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countAccuracy should not return NaN: Failed`);
  }
})();