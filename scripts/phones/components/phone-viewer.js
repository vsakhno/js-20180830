import Component from '../../component.js'

export default class PhoneViewer extends Component{
  constructor({ element }) {
    super({ element });

    this._on('click', 'back-button', () => {
      this.emit('back');
    });

    this._on('click', 'add-button', () => {
      this.emit('add', this._phone.id);
    });

    this._on('click', 'phone-thumbs', () => {
      this.changeImage(event);
    });
  }

  changeImage(event) {
    let oldImg = document.querySelector(`[data-element="phone-main-img"]`);
    let delegateTarget = event.target.closest(`[data-element="phone-thumb"]`);

    if (delegateTarget) {
      let src = delegateTarget.getAttribute('src');
      oldImg.src = src;
    }
  };

  show(phoneDetails) {
    this._phone = phoneDetails;
    this._render();

    super.show();
  }

  _render() {
    const {images, name, description} = this._phone;

    this._element.innerHTML = `
      <img class="phone" src="${ images[0] }" data-element="phone-main-img">

      <button data-element="back-button">
        Назад
      </button>
      
      <button data-element="add-button">
        В коризну
      </button>
  
      <h1>${ name }</h1>
  
      <p>${ description }</p>
  
      <ul class="phone-thumbs" data-element="phone-thumbs">
        ${ images.map(image => `
          <li>
            <img src="${ image }" data-element="phone-thumb">
          </li>
        `).join('')}
      </ul>
    `;
  }
}