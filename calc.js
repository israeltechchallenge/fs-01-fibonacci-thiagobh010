spinnerHide();
let x = 0;
let y = 0;

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
  y = fiboN(x);
  spinnerHide();
  document.getElementById('fiboResp').innerHTML = y;
};

function spinnerHide() {
  setTimeout(() => {
    document.getElementById('hideSpin').style.visibility = 'hidden';
  }, 100);
};