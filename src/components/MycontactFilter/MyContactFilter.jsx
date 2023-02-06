import PropTypes from 'prop-types';

import styles from './my-contact-filter.module.css';

const MyContactFilter = ({ handlFilter }) => {
  return (
    <div className={styles.formGroup}>
      <input
        onChange={handlFilter}
        className={styles.input}
        type="text"
        name="filter"
        placeholder="Filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </div>
  );
};

export default MyContactFilter;

MyContactFilter.prototypes = {
  onChange: PropTypes.func.isRequired,
};
