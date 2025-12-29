import { GameSetting } from "./components/game-setting.js";
import { Game } from "./components/game.js";
import { CSS_VAR_COLORS } from "./constants/colors.js";
import { GAME_STATUS } from "./constants/game-status.js";
import { GAME_DIFFICULTIES, GAME_MODES } from "./constants/game-setting.js";

const difficulties = GAME_DIFFICULTIES;
const difficultySetting = new GameSetting(document.getElementById('difficulty-selector'), difficulties);

const modes = GAME_MODES;
const modeSetting = new GameSetting(document.getElementById('mode-selector'), modes);

const game = new Game(difficultySetting.getSelectedOptionId(), modeSetting.getSelectedOptionId());

function onDifficultyChangedListener(difficultyId) {
  game.setDifficultId(difficultyId);
}

function onModeChangedListener(modeId) {
  game.setModeId(modeId);
}

difficultySetting.setOnChangedOptionListener(onDifficultyChangedListener);
modeSetting.setOnChangedOptionListener(onModeChangedListener);

difficultySetting.render();
modeSetting.render();

function onChallengeTextUpdateListener(text) {
  const mainText = document.getElementById('main-content-text-container');
  mainText.innerHTML = '';

  text.split('').forEach(char => {
    const charElement = document.createElement('span');
    charElement.textContent = char;
    charElement.classList.add('main-content-text-non-focused');
    charElement.classList.add('text-preset-1-regular');
    mainText.appendChild(charElement);
  });

  mainText.children[0].style.backgroundColor = CSS_VAR_COLORS.NEUTRAL_800;
}

function updateSettingGameUI({ isGameStarted }) {
  difficultySetting.setOptionOnClickEvent(!isGameStarted);
  modeSetting.setOptionOnClickEvent(!isGameStarted);

  document.getElementById('floating-container').style.display = isGameStarted ? 'none' : 'flex';
  document.getElementById('restart-test-container').style.display = isGameStarted ? 'flex' : 'none';
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
  mainText.children[index].style.color = isCorrectLetter ? CSS_VAR_COLORS.GREEN_500 : CSS_VAR_COLORS.RED_500;
  mainText.children[index].style.backgroundColor = null;

  const nextChild = mainText.children[index + 1];
  if (nextChild) {
    nextChild.style.backgroundColor = CSS_VAR_COLORS.NEUTRAL_800;
    nextChild.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }
}

function onTimerUpdateListener(time) {
  document.getElementById('timer-text').textContent = time;
}

function onWPMUpdateListener(wpm) {
  document.getElementById('wpm-text').textContent = wpm;
}

function onAccuracyUpdateListener(accuracy) {
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