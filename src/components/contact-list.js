import React, { Component } from 'react';
import { Message, Icon, Card } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ContactCard from './contact-card';

@observer
class ContactList extends Component {

  componentDidMount() {
    this.props.store.fetchAll();
  }

  render() {
    const { entities:contacts, loading, errors, deleteOne } = this.props.store;
    const messages = errors.messages ? errors.messages.toJS() : [];

    const errorMessages = (
      <Message negative header={errors.global} list={messages.reverse()}/>
    )

    const cards = () => {
      return contacts.map((contact) => {
        return (
          <ContactCard key={contact._id} contact={contact} deleteContact={deleteOne}/>
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
      <Message icon info>
        <Icon name='warning circle' />
        <Message.Content>
           <Message.Header>No Contacts Found</Message.Header>
           <span>Add some new contacts to get started..</span>
          <Link to={'/contacts/new'} className="ui button primary right floated">Add New Contact</Link>
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
        { errors.global && errorMessages}
        { contactCards }
      </div>
    )
  }
}

export default ContactList;
