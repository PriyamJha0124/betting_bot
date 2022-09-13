let nIntervId;
let isBet = false;
let trenArr = [];
let myTimeout;
let oldId = 0;
let history = [];
const defaultAmount = 1;
let amount = 1;
let payout = 2;
let multiply = 1;
let isStop = false;

startAuto();

function startAuto() {
  // check if already an interval has been set up
  if (!nIntervId) {
    nIntervId = setInterval(RandomTrenball, 1000);
  }
}

function randomOption() {
  return 1;
}

function RandomTrenball() {
  let labelDom = document.getElementsByClassName('sub-txt')[0];
  let node = document.getElementsByClassName('ui-table')[4].children[1].children;
  let result = parseFloat(node[0].cells[1].innerHTML);
  let gameId = parseInt(node[0].cells[0].innerText);

  if (!labelDom && !isBet) {
  // if (!labelDom && !isBet && !isStop) {
    myTimeout = setTimeout(() => {
      if (gameId > oldId ) {
        // let inputDom = document.getElementsByClassName('input-control')[0];
        let buttons = document.getElementsByClassName('button-group')[0];

        
        if (payout >= 2 && result < 2) {
          buttons.children[1].click();
          amount *= 2;
          multiply ++;          
        }
        else if (payout < 2 && result >= 2) {
          amount *= 2;
          buttons.children[1].click();
          multiply ++;
        }
        else {
          amount = defaultAmount;
          while (multiply > 1) {
            buttons.children[0].click();
            multiply --;
          }
        }
      
        setTimeout(() => {
          if (randomOption() > 1) { // green
            payout = 2;
            console.log('Green')
            document.getElementsByClassName('ui-button button-normal s-gray bet-button type200')[0].click();
          }
          else {
            payout = 1.96;
            console.log('Red')
            document.getElementsByClassName('ui-button button-normal s-gray bet-button type-200')[0].click();
          }
        }, "200");
        
        isBet = true;
        oldId = gameId;
      }
    }, "3000")
  }
  else if (labelDom && isBet) {
    isBet = false;
  }
}

function Trenball() {
  // nums.map(num => console.log(num.innerHTML));
  let labelDom = document.getElementsByClassName('sub-txt')[0];
  console.warn(labelDom);
  console.log(isBet);
  let inputDom = document.getElementsByClassName('input-control')[0];
  console.log(inputDom)
  inputDom.children[0].value = "1";

 
}

function stopAuto() {
  clearInterval(nIntervId);
  // release our intervalID from the variable
  nIntervId = null;
}