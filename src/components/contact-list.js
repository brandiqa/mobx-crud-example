import React, { Component } from 'react';
import { Message, Card } from 'semantic-ui-react';
import ContactCard from './contact-card';

class ContactList extends Component {

  createContactCards() {
    return this.props.contacts.map((contact) => {
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
        { this.props.contacts.length === 0 ? errorMessage : contactCards }
      </div>
    )
  }
}

export default ContactList;
