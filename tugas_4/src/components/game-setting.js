export class GameSetting {

  constructor(options) {
    this.options = options;
  }

  getOptions() {
    return this.options;
  }

  setOptionSelected(optionId) {
    this.selectedOptionId = optionId;
    if (this.onChangedOptionListener) this.onChangedOptionListener(optionId);
  }

  getSelectedOptionId() {
    return this.selectedOptionId;
  }

  setOnChangedOptionListener(listener) {
    this.onChangedOptionListener = listener;
  }
}