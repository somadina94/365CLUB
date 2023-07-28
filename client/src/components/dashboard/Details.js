import { FcContacts, FcAddressBook, FcApproval, FcAcceptDatabase, FcApprove, FcConferenceCall } from 'react-icons/fc';

import { useSelector } from 'react-redux';

import classes from './Details.module.css';
import { Link } from 'react-router-dom';

const Details = () => {
  const user = useSelector((state) => state.auth.user);
  const emailStatus = user.emailVerified ? 'Verified' : 'Unverified';
  const statusClasses = user.emailVerified ? classes.verified : classes.unverified;
  const idStatus =
    user.IdVerified === 'unverified'
      ? 'Unverified'
      : user.IdVerified === 'processing'
      ? 'Processing'
      : user.IdVerified === 'verified'
      ? 'Verified'
      : '';
  const idStatusClasses =
    user.IdVerified === 'verified'
      ? classes.verified
      : user.IdVerified === 'unverified'
      ? classes.unverified
      : user.IdVerified === 'processing'
      ? classes.processing
      : '';
  const membershipStatus = user.membership ? '365CLUB' : 'Regular';
  const membershipClasses = user.membership ? classes.verified : classes.unverified;
  const accountStatus = user.active ? 'Active' : 'Blocked';

  return (
    <div className={classes.details}>
      <div className={classes.content}>
        <div className={classes.title}>
          <FcContacts className={classes.icon} />
          <span>Name</span>
        </div>
        <span>{user.name}</span>
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <FcApproval className={classes.icon} />
          <span>Account Status</span>
        </div>
        <span>{accountStatus}</span>
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <FcAddressBook className={classes.icon} />
          <span>Email</span>
        </div>
        <span>{user.email}</span>
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <FcAcceptDatabase className={classes.icon} />
          <span>Email status</span>
        </div>
        <span className={statusClasses}>{emailStatus}</span>
        {!user.emailVerified && (
          <button className={classes.btn} type="button">
            Resend verification email
          </button>
        )}
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <FcApprove className={classes.icon} />
          <span>Identity Status</span>
        </div>
        <span className={idStatusClasses}>{idStatus}</span>
        {user.IdVerified === 'unverified' && <Link to="/dashboard/verify-account">Verify</Link>}
      </div>
      <div className={classes.content}>
        <div className={classes.title}>
          <FcConferenceCall className={classes.icon} />
          <span>Membership</span>
        </div>
        <span className={membershipClasses}>{membershipStatus}</span>
        {!user.membership && <Link to="/dashboard/club365">Join 365Club</Link>}
      </div>
    </div>
  );
};

export default Details;
