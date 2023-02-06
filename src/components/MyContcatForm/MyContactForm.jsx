import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './my-contact-form.module.css';

class MyContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handlSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    console.log('onSubmitMyForm', { ...this.state });
    this.setState({
      name: '',
      number: '',
    });
  };

  handlChange = ({ target }) => {
    console.log({ target });
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    console.log('after setState', this.state);
  };

  render() {
    const { handlChange, handlSubmit } = this;
    const { name, number } = this.state;
    return (
      <form action="" onSubmit={handlSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            value={name}
            name="name"
            onChange={handlChange}
            className={styles.input}
            placeholder="Name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            onChange={handlChange}
            value={number}
            className={styles.input}
            type="tel"
            name="number"
            placeholder="Number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button className={styles.btn}>Add contact</button>
      </form>
    );
  }
}

export default MyContactForm;

MyContactForm.prototypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
