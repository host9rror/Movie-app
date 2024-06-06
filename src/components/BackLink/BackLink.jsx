import { HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import css from './BackLink.module.css';

const BackLink = ({ to, children }) => {
  return (
    <div className={css.linkContainer}>
      <button type="button" className={css.goBackBtn}>
        <Link to={to} className={css.link}>
          <HiArrowLeft size="24" className={css.icon} />
          {children}
        </Link>
      </button>
    </div>
  );
};

BackLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BackLink;
