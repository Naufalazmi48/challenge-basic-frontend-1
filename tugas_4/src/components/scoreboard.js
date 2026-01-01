import { SCOREBOARD_STATUS } from "../constants/scoreboard-status.js";

export class ScoreBoard {
  getWpm() {
    return this.wpm;
  }

  getAccuracy() {
    return this.accuracy;
  }

  getTotalCharacterCorrect() {
    return this.totalCharacterCorrect;
  }

  getTotalCharacterWrong() {
    return this.totalCharacterWrong;
  }

  getPersonalBestWpm() {
    return this.personalBestWpm;
  }

  getScoreboardStatus() {
    return this.scoreboardStatus;
  }

  setWpm(wpm) {
    this.wpm = wpm;
  }

  setAccuracy(accuracy) {
    this.accuracy = accuracy;
  }

  setTotalCharacterCorrect(totalCharacterCorrect) {
    this.totalCharacterCorrect = totalCharacterCorrect;
  }

  setTotalCharacterWrong(totalCharacterWrong) {
    this.totalCharacterWrong = totalCharacterWrong;
  }

  setPersonalBestWpm(personalBestWpm) {
    this.personalBestWpm = personalBestWpm;
  }

  setScoreboardStatusListener(listener) {
    this.scoreboardStatusListener = listener;
  }

  setScoreboardStatus(status) {
    this.scoreboardStatus = status;
    if (this.scoreboardStatusListener) {
      const param = {
        wpm: this.wpm,
        accuracy: this.accuracy,
        totalCharacterCorrect: this.totalCharacterCorrect,
        totalCharacterWrong: this.totalCharacterWrong,
        personalBestWpm: this.personalBestWpm,
        scoreboardStatus: this.scoreboardStatus
      }
      this.scoreboardStatusListener(param);
    }
  }

  generateScoreboard() {
    if (!this.wpm && !this.personalBestWpm) {
      console.info(`WPM or Personal Best WPM is not set`);
      return;
    }

    if (!this.personalBestWpm) {
      this.setScoreboardStatus(SCOREBOARD_STATUS.BASELINE);
    } else if (this.wpm > this.personalBestWpm) {
      this.setScoreboardStatus(SCOREBOARD_STATUS.NEW_PERSONAL_BEST);
    } else {
      this.setScoreboardStatus(SCOREBOARD_STATUS.TEST_COMPLETE);
    }
  }
}