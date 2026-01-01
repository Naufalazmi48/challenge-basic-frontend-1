import { GAME_STATUS } from '../constants/game-status.js';
import { GAME_MODE_OPTION } from '../constants/game-setting.js';
import { GameUtil } from '../utils/GameUtil.js';
import data from '../data.json' with { type: 'json' };

export class Game {
  submissionText = '';
  status = GAME_STATUS.WAITING;
  indexChecker = 0;
  wpm = 0;
  timerInSecond = 0;

  constructor() {
    this.data = data;

    this.setGameStatus = this.setGameStatus.bind(this);
    this._getChallengeText = this._getChallengeText.bind(this);
    this.onTypingLetter = this.onTypingLetter.bind(this);
    this._getTimeoutInSecond = this._getTimeoutInSecond.bind(this);
  }

  // ==================================== Getter ======================================
  getGameStatus() {
    return this.status;
  }

  _getChallengeText() {
    const difficultyData = data[this.difficultId.toLowerCase()];
    const randomIndex = Math.floor(Math.random() * difficultyData.length);
    const randomText = difficultyData[randomIndex].text;
    return randomText;
  }

  _getTimeoutInSecond() {
    return this.modeId === GAME_MODE_OPTION.TIMED ? 60 : 1800; // force timeout in 30 minutes
  }

  getCharacterScore() {
    return GameUtil.countCharacter({ challengeText: this.challengeText, submittedText: this.submissionText });
  }

  // ==================================== Setter ======================================
  setDifficultId(difficultId) {
    this.difficultId = difficultId;
  }

  setModeId(modeId) {
    this.modeId = modeId;
  }

  setWPM(wpm) {
    this.wpm = wpm;
    if (this.onWPMUpdateListener) {
      this.onWPMUpdateListener(wpm);
    }
  }

  setAccuracy(accuracy) {
    this.accuracy = accuracy;
    if (this.onAccuracyUpdateListener) {
      this.onAccuracyUpdateListener(accuracy);
    }
  }

  setChallengeText(challengeText) {
    this.challengeText = challengeText;
    if (this.onChallengeTextUpdateListener) {
      this.onChallengeTextUpdateListener(challengeText);
    }
  }

  setOnGameStartListener(listener) {
    this.onGameStartListener = listener;
  }

  setOnGameRestartListener(listener) {
    this.onGameRestartListener = listener;
  }

  setOnEndGameListener(listener) {
    this.onEndGameListener = listener;
  }

  setOnTypingLetterListener(listener) {
    this.onTypingLetterListener = listener;
  }

  setOnTimerUpdateListener(listener) {
    this.onTimerUpdateListener = listener;
  }

  setOnWPMUpdateListener(listener) {
    this.onWPMUpdateListener = listener;
  }

  setOnAccuracyUpdateListener(listener) {
    this.onAccuracyUpdateListener = listener;
  }

  setOnChallengeTextUpdateListener(listener) {
    this.onChallengeTextUpdateListener = listener;
  }

  setGameStatus(status) {
    this.status = status;

    switch (status) {
      case GAME_STATUS.START:
        this._resetGame();
        this.setChallengeText(this._getChallengeText());
        this.onGameStartListener();
        this._startTimer();
        break;
      case GAME_STATUS.RESTART:
        this._resetGame();
        this.setChallengeText(this._getChallengeText());
        this.onGameRestartListener();
        break;
      case GAME_STATUS.END:
        this._stopTimer();
        this._updateScore();
        const { totalCorrectCharacter, totalWrongCharacter } = this.getCharacterScore();
        this.onEndGameListener({
          wpm: this.wpm,
          accuracy: this.accuracy,
          totalCorrectCharacter,
          totalWrongCharacter,
        });
        break;
    }
  }

  setTimerInSecond(timerInSecond, displayByModeId = false) {
    this.timerInSecond = timerInSecond;
    if (this.onTimerUpdateListener) {
      const timeoutInSecond = this._getTimeoutInSecond();
      const timeDisplay = this.modeId === GAME_MODE_OPTION.TIMED ? (timeoutInSecond - this.timerInSecond) : this.timerInSecond;
      const formattedTime = this._formatTime(displayByModeId ? timeDisplay : this.timerInSecond);
      this.onTimerUpdateListener(this.timerInSecond, this._getTimeoutInSecond(), formattedTime);
    }
  }

  // ==================================== Method ======================================
  _updateWPMScore({ totalCorrectCharacter }) {
    const wpm = GameUtil.countWPM({ totalCorrectCharacter, timeInSecond: this.timerInSecond });
    this.setWPM(wpm);
  };

  _updateAccuracyScore({ totalSubmittedCharacter, totalWrongCharacter }) {
    const accuracy = GameUtil.countAccuracy({ totalCharacterChecked: totalSubmittedCharacter, totalWrongCharacter });
    this.setAccuracy(accuracy);
  };

  _updateScore() {
    const { totalCorrectCharacter, totalSubmittedCharacter, totalWrongCharacter } = this.getCharacterScore();
    this._updateWPMScore({ totalCorrectCharacter });
    this._updateAccuracyScore({ totalSubmittedCharacter, totalWrongCharacter });
  }

  _resetGame() {
    this._stopTimer();
    this.submissionText = '';
    this.indexChecker = 0;
    this.setWPM(0);
    this.setAccuracy(0);
    this.setTimerInSecond(0);
  }

  _formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  _startTimer() {
    const timeoutInSecond = this._getTimeoutInSecond();
    let timerInSecond = 0;

    this.timerId = setInterval(() => {
      timerInSecond++;
      this.setTimerInSecond(timerInSecond, true);

      if (timerInSecond === timeoutInSecond) {
        this.setGameStatus(GAME_STATUS.END);
      }
    }, 1000);
  }

  _stopTimer() {
    clearInterval(this.timerId);
  }

  onTypingLetter(letter) {
    this.submissionText += letter;

    const isCorrectLetter = this.challengeText.charAt(this.indexChecker) === letter;

    if (this.onTypingLetterListener) this.onTypingLetterListener(isCorrectLetter, this.indexChecker);

    this._updateScore();
    const isFinished = this.submissionText.length === this.challengeText.length;
    if (isFinished) {
      this.setGameStatus(GAME_STATUS.END);
      return;
    }

    this.indexChecker++;
  }
}