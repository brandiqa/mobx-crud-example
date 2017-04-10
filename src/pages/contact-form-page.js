import React, { Component } from 'react';
import ContactForm from '../components/contact-form';
import store from '../stores/contact-store';
import { observer } from 'mobx-react';

@observer
class ContactFormPage extends Component {

  componentDidMount() {
    const { _id } = this.props.match.params;
    if(_id){
      store.fetchContact(_id)
    } else {
      store.newContact();
    }
  }

  render() {
    return (
      <div>
        <ContactForm contact={store.contact} />
      </div>
    )
  }
}

export default ContactFormPage;
