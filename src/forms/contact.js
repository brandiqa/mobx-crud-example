import MobxReactForm from 'mobx-react-form';
import store from '../stores/contact-store';

export const fields = {
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

class ContactForm extends MobxReactForm {

  onSuccess(form) {
    const contact = Object.assign({}, store.contact, form.values());
    if(contact._id) {
      store.updateContact(contact)
    } else {
      store.saveContact(contact);
    }
  }

  onError(form) {
    console.log('form is invalid', form.errors())
  }
}

export default ContactForm;
