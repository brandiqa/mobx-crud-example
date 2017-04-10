import React, { Component } from 'react';
import { Message, Icon, Card } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import ContactCard from './contact-card';

@observer
class ContactList extends Component {

  componentDidMount() {
    this.props.store.fetchContacts()
  }


  render() {

    const { contacts, loading, errors } = this.props.store;

    const cards = () => {
      return contacts.map((contact) => {
        return (
          <ContactCard key={contact._id} contact={contact} deleteContact={this.props.deleteContact}/>
        )
      });
    }

    const fetchingMessage = (
      <Message icon info>
        <Icon name='circle notched' loading />
        <Message.Content>
           <Message.Header>Just one moment</Message.Header>
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
           {errors.global}
       </Message.Content>
      </Message>
    )

    const contactCards = (
      <Card.Group>
        {cards()}
      </Card.Group>
    )

    return (
      <div>
        { loading && fetchingMessage }
        { contacts.length === 0 && !loading  && !errors.global && emptyMessage }
        { errors.global && timeoutMessage }
        { contacts.length > 0 && contactCards }
      </div>
    )
  }
}

export default ContactList;
