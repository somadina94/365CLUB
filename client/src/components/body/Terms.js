import classes from "./Terms.module.css";

const Terms = () => {
  return (
    <section className={classes.terms}>
      <div className={classes.content}>
        <h2>1. Introduction</h2>
        <p>
          By using and/or visiting any section our website, you agree to the
          Terms and Conditions, Privacy Policy, and Cookie Policy. If you don't
          agree, please do not use our website.
        </p>
      </div>
      <div className={classes.content}>
        <h2>2. Legal Requirements</h2>
        <p>
          Users must be at least 18 years old or the age of legal consent for
          online gambling. It is the users' responsibility to ensure that they
          comply with their own local laws regarding betting.
        </p>
      </div>
      <div className={classes.content}>
        <h2>3. Account Rules</h2>
        <p>
          To use our services, you must register and maintain one account with
          us. Users must provide accurate and complete information when creating
          an account.
        </p>
      </div>
      <div className={classes.content}>
        <h2>4. Betting Rules</h2>
        <p>
          Bets cannot be changed or cancelled once placed. The user accepts all
          outcomes of their bets.
        </p>
      </div>
      <div className={classes.content}>
        <h2>5. Financial Transactions</h2>
        <p>
          We reserve the right to use third parties to process payments. Users
          agree not to dispute transactions with the intent to receive 'free
          bets.'
        </p>
      </div>
      <div className={classes.content}>
        <h2>6. Responsible Gambling</h2>
        <p>
          We encourage responsible gambling and provide tools to help users
          manage their betting.
        </p>
      </div>
      <div className={classes.content}>
        <h2>7. Intellectual Property</h2>
        <p>
          The website, logo, graphics, etc., are our exclusive property and
          cannot be used without prior written permission.
        </p>
      </div>
      <div className={classes.content}>
        <h2>8. Limitation of Liability</h2>
        <p>
          We are not responsible for any losses incurred by users, including
          loss of profits, data, etc.
        </p>
      </div>
      <div className={classes.content}>
        <h2>9. Privacy Policy</h2>
        <p>
          We follow a strict privacy policy to protect user data. Please read it
          to understand how your personal data is used.
        </p>
      </div>
      <div className={classes.content}>
        <h2>10. Changes to the Terms</h2>
        <p>
          We may revise these Terms at any time and will notify users of any
          changes.
        </p>
      </div>
      <div className={classes.content}>
        <h2>11. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the
          international betting laws, without regard to its conflict of law
          provisions.
        </p>
      </div>
    </section>
  );
};

export default Terms;
