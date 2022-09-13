let nIntervId;
let oldId = 0;
let trenballBets = {};
let isCalc = false;

startAuto();

function getTrenballHistory() {
  let node = document.getElementsByClassName('ui-table')[4].children[1].children;
  let result = parseFloat(node[0].cells[1].innerHTML);
  let labelDom = document.getElementsByClassName('sub-txt')[0];
  let gameId = parseInt(node[0].cells[0].innerText);
  let poolProfit = 0;

  if (labelDom && !isCalc) {
    getTrenballPoolProfit();
    isCalc = true;
  }
  else if (!labelDom) {
    isCalc = false;
  }

  if (gameId > oldId ) {
    const {redPool, greenPool, yellowPool} = trenballBets;
    
    if (result < 2)
      poolProfit = greenPool + yellowPool - redPool;
    else if (result >= 2 && result < 10) 
      poolProfit = yellowPool + redPool - greenPool;
    else
      poolProfit = redPool - greenPool - yellowPool * 9;

    data = {
      gameId,
      value: result >= 100 ? 100 : result < 2 ? 1 : Math.floor(result),
      result,
      poolProfit: parseInt(poolProfit),
      date: new Date(),
    };

    oldId = gameId;
    console.log(data)
  
    fetch('http://localhost:3300/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }  
}

function getTrenballPoolProfit() {
  let redPool = 0, greenPool = 0, yellowPool = 0;
  let isGreen = false;
  let amount = 0;
  let tables = document.getElementsByClassName('ui-table');
  let shibaCells = tables[2].children[0].children;
  let dogeCells = tables[3].children[0].children;

  for (let i = 0; i < shibaCells.length; i ++) {
    redPool += parseFloat(shibaCells[i].cells[1].innerText.replace('$', ''));
  }

  amount = 10000000000;
  for (let i = 0; i < dogeCells.length; i ++) {
    let tempAmount = parseFloat(dogeCells[i].cells[1].innerText.replace('$', ''));
    if (amount >= tempAmount)
      amount = tempAmount;
    else {
      amount = tempAmount
      isGreen = true;
    }

    if (isGreen)
      greenPool += tempAmount;
    else
      yellowPool += tempAmount;
  }

  trenballBets = {redPool, greenPool, yellowPool};
}

function startAuto() {
  // check if already an interval has been set up
  if (!nIntervId) {
    nIntervId = setInterval(getTrenballHistory, 3000);
  }
}

function stopAuto() {
  clearInterval(nIntervId);
  // release our intervalID from the variable
  nIntervId = null;
}