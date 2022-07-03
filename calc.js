
spinnerHide();

function fiboN(n) {
  let a = 0, b = 1, c, i;
  if (n == 0)
    return a;
  for (i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return b;
}

function validateToCalc() {
  let x = parseInt(document.getElementById('inputN').value);
  document.getElementById('fiboResp').innerHTML = '';
  document.getElementById('hideSpin').style.visibility = 'visible';
  let saveCheckDefault = document.querySelector("#flexCheckDefault");
  if (x && saveCheckDefault.checked) {
    return callServer(x);
  }
  if (x > 50) {
    spinnerHide();
    return document.getElementById('fiboResp').innerHTML = `<div class="alert alert-danger" role="alert">Can't be larger than 50</div>`;
  }
  if (x < 1) {
    spinnerHide();
    document.getElementById('fiboResp').style.color = '#373A3C';
    return document.getElementById('fiboResp').innerHTML = "Number can't be smaller than 1";
  }
  fiboCalc(x);
}

function fiboCalc(x) {
  let y = fiboN(x);
  spinnerHide();
  document.getElementById('fiboResp').style.color = '#373A3C';
  document.getElementById('fiboResp').innerHTML = y;
};

function callServer(x) {
  fetch(`http://localhost:5050/fibonacci/${x}`)
    .then(response => {
      console.log('response: ', response);
      if (response.ok) {
        return response.json()
          .then(data => {
            spinnerHide();
            console.log('Resp: ', data.result);
            document.getElementById('fiboResp').style.color = '#373A3C';
            document.getElementById('fiboResp').innerHTML = data.result;
            document.getElementById('listResults').innerHTML = '';
            getResults();
          })
      } else {
        console.log('Entrou no ELSE: ');
        return response.text()
        .then((data) => {
          console.log('Then fetch: ', data);
          spinnerHide();
          document.getElementById('fiboResp').style.color = '#FF0000';
          document.getElementById('fiboResp').innerHTML = data;
          document.getElementById('listResults').innerHTML = '';
          getResults();
        })
      }
    });
}

function getResults() {
  let resp_list = [];
  fetch(`http://localhost:5050/getFibonacciResults`)
    .then(response => {
      if (response.ok) {
        response.json()
          .then(data => {
            spinnerHide();
            console.log('Resp: ', data.results);
            const itemList = document.getElementById('listResults');
            resp_list = data.results;
            resp_list.forEach(item => {
              let date = new Date(item.createdDate);
              let li = document.createElement('p');
              let txt = `The Fibonnaci Of ${item.number} is ${item.result}. Calculated at: ${date.toString('IL')}`;
              let node = document.createTextNode(txt);
              li.appendChild(node);
              itemList.appendChild(li);
            })
          })
          .catch((err) => {
            console.log('Err Resp: ', err);
          });
      } else {
        throw new Error(response.statusText);
      }
    });
}

function spinnerHide() {
  setTimeout(() => {
    document.getElementById('hideSpin').style.visibility = 'hidden';
  }, 100);
};

function load(){
  document.getElementById('calcBtn').addEventListener('click', validateToCalc);
  getResults();
}