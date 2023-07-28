const diceMan = () => {
  const stake = 1;
  const results = [];
  for (x = 1; x <= 1000; x++) {
    const dice = Math.floor(Math.random() * 6) + 1;

    if (dice === 3 || dice === 6 || dice === 5) {
      results.push(dice);
      //   gain = stake * results.length * 6;
    }
  }

  console.log(`${results.length} wins of ${stake * 1.9} out of 1000`);
  console.log(`Company made ${stake * 1000 - stake * results.length * 1.9}`);
};
