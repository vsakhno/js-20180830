import Component from '../../component.js';

export default class PhoneFilters extends Component {
  constructor({ element }) {
    super({ element });

    this._on('input', 'phone-search', () => {
      this.emit('search', event);
    });

    this._on('change', 'phone-sort', () => {
      this.emit('sort', event);
    });

    this._render();
  }

  _render() {
    this._element.innerHTML = `
      <div>
        <h4>Поиск:</h4>
        <input type="text" class="search" data-element="phone-search">
      </div>
      <div>
        <h4>Сортировать:</h4>
        <select class="sort" data-element="phone-sort">
          <option value="age">Новинки</option>
          <option value="name">По алфавиту</option>
        </select>
      </div>
    `;
  }
}