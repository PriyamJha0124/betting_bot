let nIntervId1, nIntervId2;
let isBet = true;
let history = [];
let limit = 100;
let gameId = 0, oldId = 0;
let result = 0;
let count = 0;
let maxLost = 200;

startAuto();

function startAuto() {
  // check if already an interval has been set up
  if (!nIntervId1)
    nIntervId1 = setInterval(getHistory, 1000);

  if (!nIntervId2)
    nIntervId2 = setInterval(Sky, 3000);
}

function getHistory() {
  let node = document.getElementsByClassName('ui-table')[1].children[1].children;
  
  if (node) {
    result = parseFloat(node[0].cells[1].innerHTML);
    gameId = parseInt(node[0].cells[0].innerText);
    
    if (gameId > oldId ) {
      oldId = gameId;
      history.push(result)
      count ++;
    }  
  }
}

function Half() {
  if (history.length > limit) {
    let labelDom = document.getElementsByClassName('sub-text')[0];
    // console.warn(labelDom);
    // console.log(isBet);

    if (!labelDom && !isBet) {
      let subData = history.slice(history.length-limit);
      let probability = Math.floor(subData.filter(item => item < 1.5).length / limit * 100);
      
      console.log(probability, subData);
      if (probability > 35 && result < 1.4) {
        document.getElementsByClassName('ui-button button-big s-conic')[0].click();
        console.log('Bet!!!!!!!')
        isBet = true;
      }
    }
    else if (labelDom && isBet) {
      isBet = false;
    }
  }
}

function Sky() {
  if (history.length > 0) {
    let labelDom = document.getElementsByClassName('sub-text')[0];
    // console.warn(labelDom);
    // console.log(isBet);

    if (!labelDom) {
      console.log(count)
      if (result >= 100) {
        isBet = true;
        count = 0;
      }

      if (count > maxLost) {
        isBet = false;
      }
      else if (isBet) {
        document.getElementsByClassName('ui-button button-big s-conic')[0].click();
      }
    }    
  }
}

function stopAuto() {
  clearInterval(nIntervId1);
  clearInterval(nIntervId2);
  nIntervId1 = null;
  nIntervId2 = null;
}