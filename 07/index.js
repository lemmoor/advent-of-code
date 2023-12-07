const fs = require('fs');
const path = require('node:path');
const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), { encoding: 'utf-8' })
  .split(/\r?\n/)
  .map((line) => {
    line = line.split(' ');
    return { hand: line[0], bid: Number(line[1]) };
  });

input.sort((a, b) => determineRank(a.hand, b.hand));

console.log(
  'part 1:',
  input.reduce((total, curr, i) => total + curr.bid * (i + 1), 0)
);

function determineRank(a, b) {
  const cardOrder = '23456789TJQKA';
  let typeDiff = getType(a) - getType(b);

  if (typeDiff == 0) {
    for (let i = 0; i < a.length; i++) {
      if (cardOrder.indexOf(a[i]) != cardOrder.indexOf(b[i])) {
        return cardOrder.indexOf(a[i]) - cardOrder.indexOf(b[i]);
      }
    }
  }

  return typeDiff;
}

function getType(hand) {
  let handCount = [];
  while (hand.length > 0) {
    let len = hand.length;
    hand = hand.replaceAll(hand[0], '');
    handCount.push(len - hand.length);
  }

  let handTypes = ['11111', '1112', '122', '113', '23', '14', '5'];

  return handTypes.indexOf(handCount.sort().join(''));
}

//part 2
function determineRank2(a, b) {
  const cardOrder = 'J23456789TQKA';

  let typeDiff = getHighestType(a) - getHighestType(b);

  if (typeDiff == 0) {
    for (let i = 0; i < a.length; i++) {
      if (cardOrder.indexOf(a[i]) != cardOrder.indexOf(b[i])) {
        return cardOrder.indexOf(a[i]) - cardOrder.indexOf(b[i]);
      }
    }
  }

  return typeDiff;
}

input.sort((a, b) => determineRank2(a.hand, b.hand));
console.log(
  'part 2:',
  input.reduce((total, curr, i) => total + curr.bid * (i + 1), 0)
);

function getHighestType(hand) {
  let handSet = new Set(hand.replaceAll('J', ''));
  let handType = -1;
  handSet.forEach((card) => {
    let type = getType(hand.replaceAll('J', card));
    if (type > handType) {
      handType = type;
    }
  });
  if (handSet.size == 0) handType = 6;
  return handType;
}
