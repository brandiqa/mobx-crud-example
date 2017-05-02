import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import ContactForm from '../components/contact-form';

const fields = {
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

class Form extends MobxReactForm {

  store = null;

  constructor(fields, plugins, store) {
    super(fields,plugins);
    this.store = store;
  }

  onSuccess(form) {
    const store = this.store;
    if(store.entity._id){
      store.update(store.entity._id, form.values())
    }
    else {
      store.create(form.values())
    }
  }
}

@inject("stores") @observer
class ContactFormPage extends Component {

  form = null;

  constructor(props){
    super(props)
    const { contactStore:store } = this.props.stores;
    const plugins = { dvr: validatorjs };
    this.form = new Form({fields},{plugins},store);
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
