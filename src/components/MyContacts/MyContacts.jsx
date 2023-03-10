import { Component } from 'react';
import { nanoid } from 'nanoid';

import MyContactList from '../MyContactList/MyContactList.jsx';
import MyContactFilter from '../MycontactFilter/MyContactFilter.jsx';
import MyContactForm from '../MyContcatForm/MyContactForm.jsx';

import styles from './my-contacts.module.css';

export default class MyContacts extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('my contacts', JSON.stringify(contacts));
    }
  }

  isDublicate(name, number) {
    const normalizedTitle = name.toLowerCase();
    const normalizedAuthor = number.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedTitle ||
        number.toLowerCase() === normalizedAuthor
      );
    });
    return result;
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      alert(`${name}. Contact: ${number} is already present`);
      return;
    }

    this.setState(prevState => {
      const { contacts } = prevState;
      const newContat = {
        id: nanoid(),
        name: name,
        number: number,
      };
      return { contacts: [newContat, ...contacts] };
    });
    return;
  };

  handlFilter = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContats = contacts.filter(contact => contact.id !== id);
      return { contacts: newContats };
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();

    const result = contacts.filter(
      ({ name, number }) =>
        name.toLocaleLowerCase().includes(normalizedFilter) ||
        number.toLocaleLowerCase().includes(normalizedFilter)
    );
    return result;
  }

  render() {
    const { addContact, deleteContact, handlFilter } = this;
    const contacts = this.getFilteredContacts();
    return (
      <div>
        <h3 className={styles.title}>My contacts</h3>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <h4 className={styles.title}>Name</h4>
            <MyContactForm onSubmit={addContact} />
          </div>
          <div className={styles.block}>
            <h4 className={styles.title}>Contacts</h4>
            <MyContactFilter handlFilter={handlFilter} />
            <MyContactList deleteContact={deleteContact} contacts={contacts} />
            {!contacts.length && (
              <p className={styles.message}>No contacts in the list</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
