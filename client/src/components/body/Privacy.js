import { Helmet } from 'react-helmet-async';

import classes from './Privacy.module.css';

const Privacy = () => {
  return (
    <section className={classes.privacy}>
      <Helmet>
        <title>Privcy policy</title>
        <meta
          name="description"
          content="Read to understand how your data is being used and secured"
        />
        <link rel="canonical" href="/privacy-policy" />
      </Helmet>
      <h2 className={classes.title}>Privacy Policy</h2>
      <div className={classes.content}>
        <h2>1. Introduction</h2>
        <p>
          Welcome to 365gainfuldice.com. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit
          our Website. Please read this privacy policy carefully. If you do not
          agree with the terms of this privacy policy, please do not access the
          site.
        </p>
      </div>
      <div className={classes.content}>
        <h2>2. Collection of your information</h2>
        <p>
          We may collect information about you in a variety of ways. The
          information we may collect on the Website includes:
        </p>
        <p>
          Personal Data: Personally identifiable information, such as your name,
          email address etc, that you voluntarily give to us when you register
          with the Website or when you choose to participate in various
          activities related to the Website.
        </p>
        <p>
          Derivative Data: Information our servers automatically collect when
          you access the Website, such as your IP address, your browser type,
          your operating system, your access times, and the pages you have
          viewed directly before and after accessing the Website.
        </p>
      </div>
      <div className={classes.content}>
        <h2>3. Use of your information</h2>
        <p>
          Having accurate information about you permits us to provide you with a
          smooth, efficient, and customized experience. We may use information
          collected about you via the Website to:
        </p>
        <p>- Enable you stake higher than 5credits with your main balance.</p>
        <p>
          - Fulfill and manage deposits, withdrawals and other transactions
          related to the Website.
        </p>
        <p>- Notify you of updates to products and services.</p>
      </div>
      <div className={classes.content}>
        <h2>4. Disclosure of your information</h2>
        <p>
          We may share information we have collected about you in certain
          situations. Your information may be disclosed as follows:
        </p>
        <p>
          - By Law or to Protect Rights: If we believe the release of
          information about you is necessary to respond to legal process, to
          investigate or remedy potential violations of our policies, or to
          protect the rights, property, and safety of others, we may share your
          information as permitted or required by any applicable law, rule, or
          regulation.
        </p>
      </div>
      <div className={classes.content}>
        <h2>5. Security of your information</h2>
        <p>
          We use administrative, technical, and physical security measures to
          help protect your personal information. While we have taken reasonable
          steps to secure the personal information you provide to us, please be
          aware that despite our efforts, no security measures are perfect or
          impenetrable, and no method of data transmission can be guaranteed
          against any interception or other type of misuse.
        </p>
      </div>
      <div className={classes.content}>
        <h2>6. Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please
          contact us at support@365gainfuldice.com.
        </p>
      </div>
    </section>
  );
};

export default Privacy;
