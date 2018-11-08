import HttpService from '../../http-service.js'

const PhoneService = {
  async getPhones({searchRequest, sortType} = {searchRequest: '', sortType: 'age'}) {
    sortType = sortType || 'age';
    let phones = await HttpService.sendRequest('phones.json');

    if (searchRequest) {
      phones = phones
        .filter(phone => phone.name.toLowerCase().includes(searchRequest.toLowerCase()));
    } 
      
    return phones.sort((phoneA, phoneB) => {
        return phoneA[sortType] > phoneB[sortType]
          ? 1
          : -1;
      });
  },

  getPhone(phoneId) {
    return HttpService.sendRequest(`phones/${phoneId}.json`);
  },

};

export default PhoneService;