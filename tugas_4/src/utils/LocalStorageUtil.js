import { LOCAL_STORAGE_KEY } from "../constants/local-storage-key.js";

export class LocalStorageUtil {
  static getPersonalBestWpm() {
    return localStorage.getItem(LOCAL_STORAGE_KEY.PERSONAL_BEST_WPM) || 0;
  }

  static setPersonalBestWpm(personalBestWpm) {
    localStorage.setItem(LOCAL_STORAGE_KEY.PERSONAL_BEST_WPM, personalBestWpm);
  }   
}