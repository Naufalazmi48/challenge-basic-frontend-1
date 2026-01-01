import { Game } from "./components/game.js";
import { CSS_VAR_COLORS } from "./constants/colors.js";
import { GAME_STATUS } from "./constants/game-status.js";
import { GAME_DIFFICULTIES, GAME_MODES } from "./constants/game-setting.js";
import { CHALLENGE_SPAN } from "./constants/styles.js";
import { OPTION_BORDER } from "./constants/styles.js";
import { GameSetting } from "./components/game-setting.js";
import { LocalStorageUtil } from "./utils/LocalStorageUtil.js";
import { ScoreBoard } from "./components/scoreboard.js";
import { SCOREBOARD_STATUS } from "./constants/scoreboard-status.js";

function settingOnClickSelectorListener(event, selector, setting) {
  const isSelectorMobile = selector.id === 'difficulty-selector-mobile' || selector.id === 'mode-selector-mobile';
  const optionId = isSelectorMobile ? event.target.value : event.target.dataset.id;
  const selectedChild = Array.from(selector.children).find(child => child.dataset.id === optionId);

  if (isSelectorMobile) {
    selectedChild.selected = true;
  } else {
    Array.from(selector.children).forEach(child => {
      if (child !== selectedChild) {
        child.className = OPTION_BORDER.UNSELECTED;
      }
    });
    selectedChild.className = OPTION_BORDER.SELECTED;
  }

  setting.setOptionSelected(optionId);
}

function renderSettingOption(options, selectors, setting, listener) {
  Array.from(selectors).forEach(selector => {
    if (selector.id === 'difficulty-selector' || selector.id === 'mode-selector') {
      options.forEach(option => {
        const optionElement = document.createElement('span');
        optionElement.textContent = option.label;
        optionElement.className = OPTION_BORDER.UNSELECTED;
        optionElement.dataset.id = option.id;
        optionElement.addEventListener('click', (event) => listener(event, selector, setting));
        selector.appendChild(optionElement);
      });
      const firstChild = selector.children[0];
      firstChild.className = OPTION_BORDER.SELECTED;
      setting.setOptionSelected(firstChild.dataset.id);
    } else if (selector.id === 'difficulty-selector-mobile' || selector.id === 'mode-selector-mobile') {
      options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.textContent = option.label;
        optionElement.value = option.id;
        optionElement.dataset.id = option.id;
        selector.appendChild(optionElement);
      });
      selector.addEventListener('change', (event) => listener(event, selector, setting));
      const firstChild = selector.children[0];
      setting.setOptionSelected(firstChild.dataset.id);
    }
  });
}

function updatePersonalBestWpm() {
  const personalBestWpm = LocalStorageUtil.getPersonalBestWpm();
  const scoreboard = document.getElementById('personal-best-wpm');
  scoreboard.textContent = personalBestWpm + ' WPM';
}

updatePersonalBestWpm();

const game = new Game();
const scoreboard = new ScoreBoard();

const difficulties = GAME_DIFFICULTIES;
const difficultySetting = new GameSetting(difficulties);

const difficultySelectors = [
  document.getElementById('difficulty-selector'),
  document.getElementById('difficulty-selector-mobile')
];

const modes = GAME_MODES;
const modeSetting = new GameSetting(modes);

const modeSelectors = [
  document.getElementById('mode-selector'),
  document.getElementById('mode-selector-mobile')
];

difficultySetting.setOnChangedOptionListener((optionId) => {
  game.setDifficultId(optionId);
});

modeSetting.setOnChangedOptionListener((optionId) => {
  game.setModeId(optionId);
});

renderSettingOption(difficulties, difficultySelectors, difficultySetting, settingOnClickSelectorListener);
renderSettingOption(modes, modeSelectors, modeSetting, settingOnClickSelectorListener);

function onChallengeTextUpdateListener(text) {
  const mainText = document.getElementById('main-content-text-container');
  mainText.innerHTML = '';

  text.split('').forEach(char => {
    const charElement = document.createElement('span');
    charElement.textContent = char;
    charElement.className = CHALLENGE_SPAN.DEFAULT;
    mainText.appendChild(charElement);
  });

  mainText.children[0].className = CHALLENGE_SPAN.FOCUSED;
}

function showFloatingContainer(display) {
  const floatingContainer = document.getElementById('floating-container');

  floatingContainer.classList.remove(display ? 'hidden' : 'flex');
  floatingContainer.classList.add(display ? 'flex' : 'hidden');
}

function showRestartTestContainer(display) {
  const restartTestContainer = document.getElementById('restart-test-container');

  restartTestContainer.classList.remove(display ? 'hidden' : 'flex');
  restartTestContainer.classList.add(display ? 'flex' : 'hidden');
}

function showScoreboard(display) {
  const scoreboardContainer = document.getElementById('scoreboard-container');

  scoreboardContainer.classList.remove(display ? 'hidden' : 'flex');
  scoreboardContainer.classList.add(display ? 'flex' : 'hidden');
}

function showGame(display) {
  const gameContainer = document.getElementById('game-container');

  gameContainer.classList.remove(display ? 'hidden' : 'flex');
  gameContainer.classList.add(display ? 'flex' : 'hidden');
}

const onKeyDownListener = (event) => {
  if (event.key.length == 1) {
    game.onTypingLetter(event.key);
  }
}

function onStartGameListener() {
  showFloatingContainer(false);
  showRestartTestContainer(true);
  showScoreboard(false);
  showGame(true);
  document.addEventListener('keydown', onKeyDownListener);
}

function onRestartGameListener() {
  showFloatingContainer(true);
  showRestartTestContainer(false);
  showScoreboard(false);
  showGame(true);

  document.removeEventListener('keydown', onKeyDownListener);
  document.getElementById('timer-text').style.color = CSS_VAR_COLORS.NEUTRAL_0;
  document.getElementById('accuracy-text').style.color = CSS_VAR_COLORS.NEUTRAL_0;
}

function onEndGameListener({ wpm, accuracy, totalCorrectCharacter, totalWrongCharacter }) {
  document.removeEventListener('keydown', onKeyDownListener);

  const personalBestWpm = LocalStorageUtil.getPersonalBestWpm();
  scoreboard.setWpm(wpm);
  scoreboard.setAccuracy(accuracy);
  scoreboard.setTotalCharacterCorrect(totalCorrectCharacter);
  scoreboard.setTotalCharacterWrong(totalWrongCharacter);
  scoreboard.setPersonalBestWpm(personalBestWpm);
  scoreboard.generateScoreboard();
}

function onTypingLetterListener(isCorrectLetter, index) {
  const mainText = document.getElementById('main-content-text-container');
  const currentChild = mainText.children[index];
  currentChild.className = isCorrectLetter ? CHALLENGE_SPAN.CORRECT : CHALLENGE_SPAN.INCORRECT;

  const nextChild = mainText.children[index + 1];
  if (nextChild) {
    nextChild.className = CHALLENGE_SPAN.FOCUSED;
    nextChild.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }
}

function onTimerUpdateListener(timeInSecond, timeoutInSecond, timeDisplay) {
  if (timeInSecond <= (timeoutInSecond * 0.2)) {
    document.getElementById('timer-text').style.color = CSS_VAR_COLORS.GREEN_500;
  } else if (timeInSecond <= (timeoutInSecond * 0.5)) {
    document.getElementById('timer-text').style.color = CSS_VAR_COLORS.YELLOW_400;
  } else {
    document.getElementById('timer-text').style.color = CSS_VAR_COLORS.RED_500;
  }
  document.getElementById('timer-text').textContent = timeDisplay;
}

function onWPMUpdateListener(wpm) {
  document.getElementById('wpm-text').textContent = wpm;
}

function getAccuracyColor(accuracy) {
  if (accuracy >= 80) {
    return CSS_VAR_COLORS.GREEN_500;
  } else if (accuracy >= 50) {
    return CSS_VAR_COLORS.YELLOW_400;
  } else {
    return CSS_VAR_COLORS.RED_500;
  }
}

function onAccuracyUpdateListener(accuracy) {
  document.getElementById('accuracy-text').style.color = getAccuracyColor(accuracy);
  document.getElementById('accuracy-text').textContent = `${accuracy}%`;
}

function updateScoreboardUI({
  wpm,
  accuracy,
  totalCharacterCorrect,
  totalCharacterWrong
}) {
  const scoreWpm = document.getElementById('score-wpm');
  const scoreAccuracy = document.getElementById('score-accuracy');
  const scoreCharacterCorrect = document.getElementById('score-character-correct');
  const scoreCharacterWrong = document.getElementById('score-character-wrong');

  scoreWpm.textContent = wpm;
  scoreAccuracy.textContent = `${accuracy}%`;
  scoreCharacterCorrect.textContent = totalCharacterCorrect;
  scoreCharacterWrong.textContent = totalCharacterWrong;
  scoreAccuracy.style.color = getAccuracyColor(accuracy);
}

function showNewBestDecoration(display) {
  const newBestIcon = document.getElementById('new-best-icon');
  const confetti = document.getElementById('confetti');

  newBestIcon.classList.remove(display ? 'hidden' : 'block');
  newBestIcon.classList.add(display ? 'block' : 'hidden');

  confetti.classList.remove(display ? 'hidden' : 'block');
  confetti.classList.add(display ? 'block' : 'hidden');
  confetti.classList.remove('animate-confetti');
  confetti.classList.add('animate-confetti');
}

function showDecoration(display) {
  const completedIcon = document.getElementById('completed-icon');
  const star1Icon = document.getElementById('star-1-icon');
  const star2Icon = document.getElementById('star-2-icon');

  completedIcon.classList.remove(display ? 'hidden' : 'block');
  completedIcon.classList.add(display ? 'block' : 'hidden');

  star1Icon.classList.remove(display ? 'hidden' : 'block');
  star1Icon.classList.add(display ? 'block' : 'hidden');

  star2Icon.classList.remove(display ? 'hidden' : 'block');
  star2Icon.classList.add(display ? 'block' : 'hidden');
}

function onScoreboardUpdateListener({
  wpm,
  accuracy,
  totalCharacterCorrect,
  totalCharacterWrong,
  personalBestWpm,
  scoreboardStatus
}) {
  try {
    showGame(false);
    showScoreboard(true);
    updateScoreboardUI({
      wpm,
      accuracy,
      totalCharacterCorrect,
      totalCharacterWrong
    });

    const scoreTitle = document.getElementById('score-title');
    const scoreDescription = document.getElementById('score-description');

    showDecoration(scoreboardStatus === SCOREBOARD_STATUS.TEST_COMPLETE || scoreboardStatus === SCOREBOARD_STATUS.BASELINE);
    showNewBestDecoration(scoreboardStatus === SCOREBOARD_STATUS.NEW_PERSONAL_BEST);

    if (scoreboardStatus === SCOREBOARD_STATUS.BASELINE || scoreboardStatus === SCOREBOARD_STATUS.NEW_PERSONAL_BEST) {
      LocalStorageUtil.setPersonalBestWpm(wpm);
      updatePersonalBestWpm();
    }

    if (scoreboardStatus === SCOREBOARD_STATUS.NEW_PERSONAL_BEST) {
      scoreTitle.textContent = 'High Score Smashed!';
      scoreDescription.textContent = 'You’re getting faster. That was incredible typing.';
    } else if (scoreboardStatus === SCOREBOARD_STATUS.BASELINE) {
      scoreTitle.textContent = 'Baseline Established!';
      scoreDescription.textContent = 'You’ve set the bar. Now the real challenge begins—time to beat it.';
    } else {
      scoreTitle.textContent = 'Test Complete!';
      scoreDescription.textContent = 'Solid run. Keep pushing to beat your high score.';
    }
  } catch (error) {
    console.error(error);
  }

}

game.setOnGameStartListener(onStartGameListener);
game.setOnGameRestartListener(onRestartGameListener);
game.setOnEndGameListener(onEndGameListener);
game.setOnTypingLetterListener(onTypingLetterListener);
game.setOnTimerUpdateListener(onTimerUpdateListener);
game.setOnWPMUpdateListener(onWPMUpdateListener);
game.setOnAccuracyUpdateListener(onAccuracyUpdateListener);
game.setOnChallengeTextUpdateListener(onChallengeTextUpdateListener);

scoreboard.setScoreboardStatusListener(onScoreboardUpdateListener);

document.getElementById('start-button').addEventListener('click', () => { game.setGameStatus(GAME_STATUS.START) });
document.getElementById('restart-button').addEventListener('click', () => { game.setGameStatus(GAME_STATUS.RESTART) });
document.getElementById('floating-container').addEventListener('click', () => { game.setGameStatus(GAME_STATUS.START) });
document.getElementById('go-again-button').addEventListener('click', () => { game.setGameStatus(GAME_STATUS.RESTART) });