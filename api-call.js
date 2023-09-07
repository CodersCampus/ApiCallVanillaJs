const ApiElement = (() => {
    class ApiElement {
      constructor() {
        this.name = 'Call the API';
        this.data = { yada: "null", foo: 1, bar: true, wah: "wah" };
      }
  
      render() {
        const html = `
          <div>
            <button id="callButton">${this.name}</button>
          </div>
        `;
        document.querySelector('#api-vanilla').innerHTML = html;
      }
  
      clearData() {
        this.name = 'Call the API';
        this.data = { yada: "null", foo: 1, bar: true, wah: "wah" };
        document.querySelector('#api-vanilla').innerHTML = `
          <h1> Click the button!</h1>
          <button id="callButton">${this.name}</button>
        `;
        const callButton = document.getElementById('callButton');
        callButton.addEventListener('click', this.callApi.bind(this));
      }
  
      async callApi() {
        console.log('callApi loaded');
        const response = await fetch('https://punk-production.up.railway.app/xmpl/datum', {
          method: 'POST'
        });
        const data = await response.text();
        const jsonData = JSON.parse(data);
        this.data = jsonData;
        this.name = "Clear the Data";
        document.querySelector('#api-vanilla').innerHTML = `
          <h1> You've got data!</h1>
          <p>Yada = ${this.data.yada}</p>
          <p>Foo = ${this.data.foo}</p>
          <p>Bar = ${this.data.bar}</p>
          <p>Wah = ${this.data.wah}</p>
          <div>
            <button id="clearButton">${this.name}</button>
          </div>
        `;
        const clearButton = document.getElementById('clearButton');
        clearButton.addEventListener('click', this.clearData.bind(this));
      }
    }
  
    return ApiElement;
  })();
  
  document.addEventListener('DOMContentLoaded', () => {
    const apiElement = document.querySelector('#api-vanilla');
    const api = new ApiElement();
    api.render();
    const callButton = document.getElementById('callButton');
    callButton.addEventListener('click', api.callApi.bind(api));
  });
  