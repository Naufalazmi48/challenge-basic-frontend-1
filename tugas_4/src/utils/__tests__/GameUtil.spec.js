import assert from 'assert';
import { GameUtil } from '../GameUtil.js';

console.info('=========================================== GameUtil.countCharacter =============================================');
(() => {
  // Test GameUtil.countCharacter Case A

  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = 'Lalu Naufal Azmi';

    const expectedCorrectCharacter = 16;
    const expectedSubmittedCharacter = 16;
    const expectedWrongCharacter = 0;
    const expectedResult = {
      totalCorrectCharacter: expectedCorrectCharacter,
      totalSubmittedCharacter: expectedSubmittedCharacter,
      totalWrongCharacter: expectedWrongCharacter
    };
    // When
    const result = GameUtil.countCharacter({ challengeText, submittedText });
    // Then
    assert.deepStrictEqual(result, expectedResult);
    console.info(`Test GameUtil.countCharacter Case A: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCharacter Case A: Failed`);
  }
})();

(() => {
  // Test GameUtil.countCharacter Case B

  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = 'La luNaufal Azmi';

    const expectedCorrectCharacter = 13;
    const expectedSubmittedCharacter = 16;
    const expectedWrongCharacter = 3;
    const expectedResult = {
      totalCorrectCharacter: expectedCorrectCharacter,
      totalSubmittedCharacter: expectedSubmittedCharacter,
      totalWrongCharacter: expectedWrongCharacter
    };
    // When
    const result = GameUtil.countCharacter({ challengeText, submittedText });
    // Then
    assert.deepStrictEqual(result, expectedResult);
    console.info(`Test GameUtil.countCharacter Case B: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCharacter Case B: Failed`);
  }
})();

(() => {
  // Test GameUtil.countCharacter Case C

  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = 'La luNaufal';

    const expectedCorrectCharacter = 8;
    const expectedSubmittedCharacter = 11;
    const expectedWrongCharacter = 3;
    const expectedResult = {
      totalCorrectCharacter: expectedCorrectCharacter,
      totalSubmittedCharacter: expectedSubmittedCharacter,
      totalWrongCharacter: expectedWrongCharacter
    };
    // When
    const result = GameUtil.countCharacter({ challengeText, submittedText });
    // Then
    assert.deepStrictEqual(result, expectedResult);
    console.info(`Test GameUtil.countCharacter Case C: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCharacter Case C: Failed`);
  }
})();

(() => {
  // Test GameUtil.countCorrectedCharacter when there isn't submitted text

  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = '';

    const expectedCorrectCharacter = 0;
    const expectedSubmittedCharacter = 0;
    const expectedWrongCharacter = 0;
    const expectedResult = {
      totalCorrectCharacter: expectedCorrectCharacter,
      totalSubmittedCharacter: expectedSubmittedCharacter,
      totalWrongCharacter: expectedWrongCharacter
    };
    // When
    const result = GameUtil.countCharacter({ challengeText, submittedText });
    // Then
    assert.deepStrictEqual(result, expectedResult);
    console.info(`Test GameUtil.countCorrectedCharacter when there isn't submitted text: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCorrectedCharacter when there isn't submitted text: Failed`);
  }
})();

(() => {
  // Test GameUtil.countCorrectedCharacter when user submitted many white space

  try {
    // Given
    const challengeText = 'Lalu Naufal Azmi';
    const submittedText = 'Lalu na  ufal  a zmi';

    const expectedCorrectCharacter = 6;
    const expectedSubmittedCharacter = 16;
    const expectedWrongCharacter = 10;
    const expectedResult = {
      totalCorrectCharacter: expectedCorrectCharacter,
      totalSubmittedCharacter: expectedSubmittedCharacter,
      totalWrongCharacter: expectedWrongCharacter
    };
    // When
    const result = GameUtil.countCharacter({ challengeText, submittedText });
    // Then
    assert.deepStrictEqual(result, expectedResult);
    console.info(`Test GameUtil.countCorrectedCharacter when user submitted many white space: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countCorrectedCharacter when user submitted many white space: Failed`);
  }
})();

console.info('\n=========================================== GameUtil.countWPM =============================================');
(() => {
  // Test GameUtil.countWPM should return correct WPM when time is 60 seconds
  try {
    // Given
    const totalCorrectCharacter = 40;
    const timeInSecond = 60;

    const expectedWPM = 8;

    // When
    const result = GameUtil.countWPM({ totalCorrectCharacter, timeInSecond });

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
    const totalCorrectCharacter = 40;
    const timeInSecond = 40;

    const expectedWPM = 12;

    // When
    const result = GameUtil.countWPM({ totalCorrectCharacter, timeInSecond });

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
    const totalCorrectCharacter = 40;
    const timeInSecond = 100;

    const expectedWPM = 4;

    // When
    const result = GameUtil.countWPM({ totalCorrectCharacter, timeInSecond });

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
    const totalCorrectCharacter = 0;
    const timeInSecond = 0;

    const expectedWPM = 0;

    // When
    const result = GameUtil.countWPM({ totalCorrectCharacter, timeInSecond });

    // Then
    assert.strictEqual(result, expectedWPM);
    console.info(`Test GameUtil.countWPM should not return NaN when timeInSecond is 0: Passed`);
  } catch (error) {
    console.error(error);
    console.info(`Test GameUtil.countWPM should not return NaN when timeInSecond is 0: Failed`);
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