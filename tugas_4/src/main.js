import { Game } from "./components/game.js";
import { CSS_VAR_COLORS } from "./constants/colors.js";
import { GAME_STATUS } from "./constants/game-status.js";
import { GAME_DIFFICULTIES, GAME_MODES } from "./constants/game-setting.js";
import { CHALLENGE_SPAN } from "./constants/styles.js";
import { OPTION_BORDER } from "./constants/styles.js";
import { GameSetting } from "./components/game-setting.js";

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

const game = new Game();

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

function updateSettingGameUI({ isGameStarted }) {
  document.getElementById('floating-container').classList.remove(isGameStarted ? 'flex' : 'hidden');
  document.getElementById('floating-container').classList.add(isGameStarted ? 'hidden' : 'flex');
  document.getElementById('restart-test-container').classList.remove(isGameStarted ? 'hidden' : 'flex');
  document.getElementById('restart-test-container').classList.add(isGameStarted ? 'flex' : 'hidden');
}

const onKeyDownListener = (event) => {
  if (event.key.length == 1) {
    game.onTypingLetter(event.key);
  }
}

function onStartGameListener() {
  updateSettingGameUI({ isGameStarted: true });
  document.addEventListener('keydown', onKeyDownListener);
}

function onRestartGameListener() {
  updateSettingGameUI({ isGameStarted: false });
  document.removeEventListener('keydown', onKeyDownListener);
}

function onEndGameListener() {
  document.removeEventListener('keydown', onKeyDownListener);
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

function onAccuracyUpdateListener(accuracy) {
  if (accuracy >= 80) {
    document.getElementById('accuracy-text').style.color = CSS_VAR_COLORS.GREEN_500;
  } else if (accuracy >= 50) {
    document.getElementById('accuracy-text').style.color = CSS_VAR_COLORS.YELLOW_400;
  } else {
    document.getElementById('accuracy-text').style.color = CSS_VAR_COLORS.RED_500;
  }
  document.getElementById('accuracy-text').textContent = `${accuracy}%`;
}

game.setOnGameStartListener(onStartGameListener);
game.setOnGameRestartListener(onRestartGameListener);
game.setOnEndGameListener(onEndGameListener);
game.setOnTypingLetterListener(onTypingLetterListener);
game.setOnTimerUpdateListener(onTimerUpdateListener);
game.setOnWPMUpdateListener(onWPMUpdateListener);
game.setOnAccuracyUpdateListener(onAccuracyUpdateListener);
game.setOnChallengeTextUpdateListener(onChallengeTextUpdateListener);

document.getElementById('start-button').addEventListener('click', () => { game.setGameStatus(GAME_STATUS.START) });
document.getElementById('restart-button').addEventListener('click', () => { game.setGameStatus(GAME_STATUS.RESTART) });
document.getElementById('floating-container').addEventListener('click', () => { game.setGameStatus(GAME_STATUS.START) });