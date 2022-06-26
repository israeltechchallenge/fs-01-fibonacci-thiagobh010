spinnerHide();
let x = 0;
let y = 0;

/*function fiboN(n) {
  let a = 0, b = 1, c, i;
  if (n == 0)
    return a;
  for (i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return b;
} */

function spinnerShow(){
  document.getElementById('fiboResp').innerHTML = '';
  document.getElementById('hideSpin').style.visibility = 'visible';
  setTimeout(() => {
    fiboCalc();
  }, 500);
}

function fiboCalc() {  
  x = parseInt(document.getElementById('inputN').value);
  if (x == 42) {
    spinnerHide();
    document.getElementById('fiboResp').innerHTML = "42 is the meaning of life";
    return document.getElementById('fiboResp').style.color = '#FF0000';
  }
  if (x > 50) {
    spinnerHide();
    return document.getElementById('fiboResp').innerHTML = `<div class="alert alert-danger" role="alert">
    Can't be larger than 50</div>`;
  }
  if (x < 1) {
    spinnerHide();
    return document.getElementById('fiboResp').innerHTML = "Number can't be smaller than 1";
  } 
  callServer(x);    // y = fiboN(x);
  spinnerHide();
  document.getElementById('fiboResp').innerHTML = y;
};

function spinnerHide() {
  setTimeout(() => {
    document.getElementById('hideSpin').style.visibility = 'hidden';
  }, 100);
};

function callServer(x) {
  fetch(`http://localhost:5050/fibonacci/${x}`)
    .then(response => {
      console.log('response: ', response);
      if (response.ok) {
        response.json()
          .then(data => {
            spinnerHide();
            console.log('Resp: ', data.result);
            document.getElementById('fiboResp').style.color = '#373A3C';
            document.getElementById('fiboResp').innerHTML = data.result;
          })
          .catch((err)=>{
            console.log('Err Resp: ', err);
          });
      }else {
        spinnerHide();
        document.getElementById('fiboResp').innerHTML = "42 is the meaning of life";
        return document.getElementById('fiboResp').style.color = '#FF0000';
      }
    }) 
} 