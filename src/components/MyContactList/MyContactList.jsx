import PropTypes from 'prop-types';

import styles from './my-contact-list.module.css';

const MyContactList = ({ deleteContact, contacts }) => {

  const items = contacts.map(({ id, name, number }) => (
    <li key={id} className={styles.item}>
      {name}: {number}
      <button onClick={() => deleteContact(id)} className={styles.btn}>
        Delete
      </button>
    </li>
  ));
  return <ul>{items}</ul>;
};

export default MyContactList;

MyContactList.defaultProps = {
  contacts: [],
};

MyContactList.prototypes = {
  onClick: PropTypes.func.isRequired,
  contacts: PropTypes.object.isRequired,
};
