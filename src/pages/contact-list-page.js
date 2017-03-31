import React, { Component } from 'react';

import ContactList from '../components/contact-list';
import { contacts } from '../mock-data';

class ContactListPage extends Component {
  render() {
    return (
      <div>
        <h1>List of Contacts</h1>
        <ContactList contacts={contacts} deleteContact={() => console.log('not working')}/>
      </div>
    )
  }
}

export default ContactListPage;
