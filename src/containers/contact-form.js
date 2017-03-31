import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
const plugins = { dvr: validatorjs };

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
    rules: 'required|email|string'
  }
};

class ContactForm extends MobxReactForm {
  onSuccess(form) {
    console.log('form is valid', form.values());
  }

  onError(form) {
    console.log('form is invalid', form.errors())
  }
}

export default new ContactForm({fields},{plugins});
