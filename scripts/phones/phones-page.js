import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneFilters from './components/phones-filter.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
    this._initFilters();
  }

  _initCatalog () {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
    });

    this._loadPhonesFromServer();

    this._catalog.subscribe('phoneSelected', (phoneId) => {
      PhoneService.getPhone(phoneId)
      .then((phoneDetails) => {
        this._catalog.hide();
        this._viewer.show(phoneDetails);
      })
      .catch((error) => {
        console.log(error);
      });
    });

    this._catalog.subscribe('add', (phoneId) => {
      this._shoppingCart.addItem(phoneId);
    });
  }

  _loadPhonesFromServer (searchRequest, sortType) {
    PhoneService.getPhones({searchRequest, sortType})
    .then((phones) => {
      this._catalog.show(phones);
    });
  };

  // _loadPhonesFromServerFiltered (searchRequesr) {
  //   PhoneService.getPhones((phones) => {
  //     if (searchRequesr) {

  //       let filteredPhones = phones.filter((phone) => {
  //         searchRequesr = searchRequesr.toLowerCase();
  //         return phone.id.toLowerCase().indexOf(searchRequesr) + 1 > 0 || phone.snippet.toLowerCase().indexOf(searchRequesr) + 1 > 0;
  //       });

  //       this._catalog.show(filteredPhones);

  //     }

  //   });
  // };

  // _loadPhonesFromServerSortered (sortType) {
  //   PhoneService.getPhones((phones) => {

  //     if (sortType) {
  //       let sortedPhones = phones; 

  //       if (sortType === 'name') {
  //         sortedPhones = phones.sort((a, b) => {
  //           a = a.name.toLowerCase();
  //           b = b.name.toLowerCase();
              
  //           if (a > b) return 1;
  //           if (a < b) return -1;
  //           return 0;
  //         });
  //       };  

  //       if (sortType === 'age') {
  //         sortedPhones = phones.sort((a, b) => {
  //           if (a > b) return 1;
  //           if (a < b) return -1;
  //           return 0;
  //         });
  //       }; 

  //       this._catalog.show(sortedPhones);
  //     } 
  //   });
  // };

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),
    });

    this._viewer.subscribe('add', (phoneId) => {
      this._shoppingCart.addItem(phoneId);
    });

    this._viewer.subscribe('back', () => {
      this._viewer.hide();
      this._loadPhonesFromServer();
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]'),
    });
  }

  _initFilters() {
    this._filter = new PhoneFilters({
      element: this._element.querySelector('[data-component="phones-filter"]'),
      
    });

    this._filter.subscribe('search', (event) => {
      this._viewer.hide();
      this._filter.search = event.target.value;
      this._loadPhonesFromServer( this._filter.search, this._filter.sort );
    });

    this._filter.subscribe('sort', (event) => {
      this._viewer.hide();
      this._filter.sort = event.target.value;
      this._loadPhonesFromServer( this._filter.search, this._filter.sort );
    });
  }

  _render() {
    this._element.innerHTML = `
      <div data-page-container class="container-fluid"></div>
        <div class="row">

          <!--Sidebar-->
          <div class="col-md-2">
            <section>
              <div data-component="phones-filter"></div>  
            </section>
            <section class="cart">
              <div data-component="shopping-cart" class="cart"></div>  
            </section>
          </div>
      
          <!--Main content-->
          <div class="col-md-10">
            <div data-component="phone-catalog" class="js-hidden"></div>
            <div data-component="phone-viewer" class="js-hidden"></div>
          </div>
        </div>
      </div>
    `;
  }
}