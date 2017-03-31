import React, { Component } from 'react';
import { Message, Card } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import ContactCard from './contact-card';

@observer
class ContactList extends Component {

  componentDidMount() {
    this.props.store.fetchContacts()
  }

  createContactCards() {
    return this.props.store.contacts.map((contact) => {
      return (
        <ContactCard key={contact._id} contact={contact} deleteContact={this.props.deleteContact}/>
      )
    });
  }

  render() {
    const errorMessage = (
      <Message negative>
        <Message.Header>SERVER ERROR!</Message.Header>
        <p>{this.props.serverError}</p>
      </Message>
    );

    const contactCards = (
      <Card.Group>
        {this.createContactCards()}
      </Card.Group>
    )

    return (
      <div>
        { this.props.store.contacts.length === 0 ? errorMessage : contactCards }
      </div>
    )
  }
}

export default ContactList;
