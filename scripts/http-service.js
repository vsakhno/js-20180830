
const API_URL = 'https://mgrinko.github.io/js-20180830';
// const API_URL = 'http://localhost:3000';

const HttpService = {
  sendRequest(url) {
    // return fetch(`${API_URL}/api/${url}`)
    //   .then(response => response.json())
    
      return new Promise( (resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let method = 'GET';
    
        xhr.open(method, `${API_URL}/api/${url}`, true);
    
        xhr.send();
    
        xhr.onload = () => {
          if (xhr.status !== 200) {
            reject( xhr.status + ': ' + xhr.statusText );
          } else {
            let data = JSON.parse(xhr.responseText);
    
            resolve(data);
          }
        };
    });
  }
};

export default HttpService;