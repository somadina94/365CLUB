import classes from './Rules.module.css';

const Rules = () => {
  return (
    <section className={classes.rules}>
      <div className={classes.content}>
        <h2>1. Sign up</h2>
        <p>
          You are expected to sign up with an email account you own for proper verification. You
          have to verifiy your email after sign up to be able to use your free credits.
        </p>
      </div>
      <div className={classes.content}>
        <h2>2. Credits</h2>
        <p>
          You get 50credits which is equivalent to $50 on sign up. You must play dice with your free
          credits before you will be able to withdraw money.
        </p>
      </div>
      <div className={classes.content}>
        <h2>3. Deposits</h2>
        <p>
          The minimium you can deposit to your account is $5 which is equivalent to 5 356gainfuldice
          credits. The max you can deposit is $1000 which is equivalent to 1000 credits. The max or
          min desposit may change in the future. Payment methods are only cryptocurrencies.
        </p>
      </div>
      <div className={classes.content}>
        <h2>4. Withdrawals</h2>
        <p>
          The minimium you can withdraw from your account is $50 which is equivalent to 50
          356gainfuldice credits. There are no withdrawal limits. Payment methods are only
          cryptocurrencies. You will be prompted to enter your BTC or Ethereum wallet address. We
          only support BITCOIN and ETHEREUM withdrawals at the moment, you will be notified of
          changes in the future. You can only withdraw is your account passed out ID verification.
        </p>
      </div>
      <div className={classes.content}>
        <h2>5. Stakes</h2>
        <p>
          The minimium stake per game is 5credits for regular accounts. If you wish to stake higher
          than 5credits, you are invited to verify your account and sibscribe to 365CLUB MEMBERSHIP.
        </p>
      </div>
      <div className={classes.content}>
        <h2>6. Winning condition</h2>
        <p>
          To win you have to roll a 3, 5 or 6, otherwise you lost. The winning odd is 1.9, for
          example, if you stake 1credit, you get the 1 plus .90 credits which is 1.90credits total.
        </p>
      </div>
    </section>
  );
};

export default Rules;
