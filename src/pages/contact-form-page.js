import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createForm from '../forms/form';
import ContactForm from '../components/contact-form';

@inject("stores") @observer
class ContactFormPage extends Component {

  form = null;
  fields = {
    name:{
      name: 'name',
      label: 'Name',
      fields: [{
        name: 'first',
        label: 'First Name',
        placeholder: 'First Name',
        rules: 'required|string'
      },
      {
        name: 'last',
        label: 'Last Name',
        placeholder: 'Last Name',
        rules: 'string'
      }]
    },
    phone: {
      name: 'phone',
      label: 'Phone',
      placeholder: 'Enter phone number',
      rules: 'required|string'
    },
    email: {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter email address',
      rules: 'required|string|email'
    }
  };

  constructor(props){
    super(props)
    this.form = createForm(this.fields, this.props.stores.contactStore);
  }

  componentDidMount() {
    const { _id } = this.props.match.params;
    const { contactStore:store } = this.props.stores;
    if(_id){
      store.fetch(_id)
    } else {
      store.newEntity();
    }
  }

  render() {
    const { contactStore:store } = this.props.stores;
    return (
      <div>
        <ContactForm store={store} form={this.form} contact={store.entity}/>
      </div>
    )
  }
}

export default ContactFormPage;
