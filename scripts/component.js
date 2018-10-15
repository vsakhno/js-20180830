const CLASS_HIDDEN = 'js-hidden';

export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  hide() {
    this._element.classList.add(CLASS_HIDDEN);
  }

  show() {
    this._element.classList.remove(CLASS_HIDDEN);
  }
}
