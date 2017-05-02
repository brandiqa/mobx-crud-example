import React, { Component } from 'react';
import ContactList from '../components/contact-list';
import { inject } from 'mobx-react';

@inject("stores")
class ContactListPage extends Component {
  render() {
    return (
      <div>
        <h1>List of Contacts</h1>
        <ContactList store={this.props.stores.contactStore} />
      </div>
    )
  }
}

export default ContactListPage;
