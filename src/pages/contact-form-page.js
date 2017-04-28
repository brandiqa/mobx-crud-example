import React, { Component } from 'react';
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import ContactForm from '../components/contact-form'
import stores from '../stores';

const store =  stores.contacts;

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
  onSuccess(form) {
    if(store.entity._id){
      store.update(store.entity._id, form.values())
    }
    else {
      store.create(form.values())
    }
  }
}

@observer
class ContactFormPage extends Component {

  form = null;

  constructor(props){
    super(props)
    const plugins = { dvr: validatorjs };
    this.form = new Form({fields},{plugins});
  }

  componentDidMount() {
    const { _id } = this.props.match.params;
    if(_id){
      store.fetch(_id)
    } else {
      store.newEntity();
    }
  }

  render() {
    return (
      <div>
        <ContactForm store={store} form={this.form} contact={store.entity}/>
      </div>
    )
  }
}

export default ContactFormPage;
