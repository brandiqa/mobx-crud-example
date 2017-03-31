import React, { Component } from 'react';
import store from '../stores/contact-store'
import ContactList from '../components/contact-list';
// import { contacts } from '../mock-data';

class ContactListPage extends Component {
  render() {
    return (
      <div>
        <h1>List of Contacts</h1>
        <ContactList store={store}/>
      </div>
    )
  }
}

export default ContactListPage;
