let nIntervId;
let oldId = 0;
let trenballBets = {};
let isCalc = false;

startAuto();

function getClassicPoolProfit() {
  let poolProfit = 0;

  const loseArr = document.getElementsByClassName('is-lose');
  for (let i = 0; i < loseArr.length; i ++) {
    poolProfit += parseFloat(loseArr[i].children[0].innerText.replace('$', ''));
  }

  if (loseArr.length > 0) {
    const winArr = document.getElementsByClassName('is-win');
    for (let i = 0; i < winArr.length; i ++) {
      poolProfit -= parseFloat(winArr[i].children[0].innerText.replace('$', ''));
    }
  }
  
  return parseInt(poolProfit)
}

function getClassicHistory() {
  let node = document.getElementsByClassName('ui-table')[1].children[1].children;
  let result = parseFloat(node[0].cells[1].innerHTML);
  let gameId = parseInt(node[0].cells[0].innerText);

  console.log(gameId, oldId);
  if (gameId > oldId ) {
    data = {
      gameId,
      value: result >= 100 ? 100 : result < 2 ? 1 : Math.floor(result),
      result,
      poolProfit: getClassicPoolProfit(),
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

function startAuto() {
  // check if already an interval has been set up
  if (!nIntervId) {
    nIntervId = setInterval(getClassicHistory, 3000);
  }
}

function stopAuto() {
  clearInterval(nIntervId);
  // release our intervalID from the variable
  nIntervId = null;
}