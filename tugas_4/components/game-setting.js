export class GameSetting {
  selectedOptionElement;
  selectedOptionId;
  elementContainer;
  options;

  constructor(elementContainer, options) {
    this.elementContainer = elementContainer;
    this.options = options;

    this.onClickSettingSelector = this.onClickSettingSelector.bind(this);
    this._setOptionSelected = this._setOptionSelected.bind(this);
    this.setOptionOnClickEvent = this.setOptionOnClickEvent.bind(this);
  }

  _setOptionSelected(optionId) {
    this.selectedOptionId = optionId;
    if (this.onChangedOptionListener) this.onChangedOptionListener(optionId);
  }

  onClickSettingSelector(event, option) {
    if (this.selectedOptionElement) {
      this.selectedOptionElement.classList.remove('selected-setting');
      this.selectedOptionElement.classList.add('unselected-setting');
    }
    this.selectedOptionElement = event.currentTarget;
    this.selectedOptionElement.classList.add('selected-setting');
    this._setOptionSelected(option.id);
  }

  getSelectedOptionId() {
    return this.selectedOptionId;
  }

  setOnChangedOptionListener(listener) {
    this.onChangedOptionListener = listener;
  }

  render() {
    this.options.forEach(option => {
      const optionElement = document.createElement('span');
      optionElement.textContent = option.label;
      optionElement.classList.add('text-preset-5');
      optionElement.classList.add('unselected-setting');
      optionElement.addEventListener('click', (event) => this.onClickSettingSelector(event, option));
      this.elementContainer.appendChild(optionElement);
    });
    this.selectedOptionElement = this.elementContainer.children[0];
    this.selectedOptionElement.classList.add('selected-setting');
    this._setOptionSelected(this.options[0].id);
  }

  setOptionOnClickEvent(isEnabled) {
    Array.from(this.elementContainer.children).forEach(optionElement => {
      if (isEnabled) {
        optionElement.style.pointerEvents = 'auto';
      } else {
        optionElement.style.pointerEvents = 'none';
      }
    });
  }
}