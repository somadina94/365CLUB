exports.diceMan = () => {
  const stake = 5;
  const results = [];
  for (x = 1; x <= 100; x++) {
    const dice = Math.floor(Math.random() * 6) + 1;

    if (dice === 3 || dice === 6 || dice === 5) {
      results.push(dice);
      //   gain = stake * results.length * 6;
    }
  }

  console.log(`${results.length} wins of ${stake * 1.5} out of 100`);
  console.log(`Company made ${stake * 100 - stake * results.length * 1.5}`);
};
