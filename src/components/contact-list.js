import React, { Component } from 'react';
import { Message, Icon, Card } from 'semantic-ui-react';
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

    const fetchingMessage = (
      <Message icon info>
        <Icon name='circle notched' loading />
        <Message.Content>
           <Message.Header>Just one second</Message.Header>
           We are fetching that content for you.
       </Message.Content>
      </Message>
    )

    const emptyMessage = (
      <Message icon warning>
        <Icon name='warning circle' />
        <Message.Content>
           <Message.Header>No Contacts Found</Message.Header>
           Add some new contacts to get started.
       </Message.Content>
      </Message>
    )

    const timeoutMessage = (
      <Message icon negative>
        <Icon name='wait' />
        <Message.Content>
           <Message.Header>Server Timeout</Message.Header>
           Start the backend server then refresh this page
       </Message.Content>
      </Message>
    )

    const contactCards = (
      <Card.Group>
        {this.createContactCards()}
      </Card.Group>
    )
    const { fetching, error, contacts } = this.props.store;

    return (
      <div>
        { fetching && fetchingMessage }
        { contacts.length === 0 && !fetching  && !error && emptyMessage }
        { error && timeoutMessage }
        { contacts.length > 0 && contactCards }
      </div>
    )
  }
}

export default ContactList;
