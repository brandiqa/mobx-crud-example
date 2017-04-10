import React from 'react';
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';
import MobxReactFormDevTools from 'mobx-react-form-devtools';
import validatorjs from 'validatorjs';
import { Icon, Form, Button, Grid, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import InputField from './input-field';
import store from '../stores/contact-store';

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

class MobxForm extends MobxReactForm {
  onSuccess(form) {
    const contact = Object.assign({}, store.contact, form.values());
    if(contact._id) {
      store.updateContact(contact)
    } else {
      store.saveContact(contact);
    }
  }
}

@observer
class ContactForm extends React.Component {

  form = null;

  componentWillMount() {
    const plugins = { dvr: validatorjs };
    this.form = new MobxForm({fields},{plugins});
    MobxReactFormDevTools.register({
      contactForm: this.form
    });
    MobxReactFormDevTools.select('contactForm');
  }

  componentWillReceiveProps = (nextProps) => {
    const contact = nextProps.contact;
    this.form.update(contact);
  }

  render() {
    const form = this.form;
    const { redirect, loading, errors, contact } = store;

    const errorMessage = (
      <Message icon negative>
        <Icon name='wait' />
        <Message.Content>
           <Message.Header>Something went wrong!</Message.Header>
           {errors.global}
       </Message.Content>
      </Message>
    );

    const formComponent = (
      <Form onSubmit={form.onSubmit} loading={loading}>
        <Form.Group widths='equal'>
          <InputField field={form.$('name.first')} error={errors.first} />
          <InputField field={form.$('name.last')} error={errors.last}/>
        </Form.Group>
        <InputField field={form.$('phone')} error={errors.phone} />
        <InputField field={form.$('email')} error={errors.email} />
        <Button primary type='submit' onClick={form.onSubmit} disabled={form.isPristine}>Save</Button>
      </Form>
    );

    const grid = (
      <div>
        <MobxReactFormDevTools.UI />
        <Grid centered columns={2}>
          <Grid.Column>
            <h1 style={{marginTop:"1em"}}>{ contact._id ? 'Edit Contact' : 'Add New Contact' }</h1>
            {errors.global && errorMessage }
            {formComponent}
          </Grid.Column>
        </Grid>
      </div>
    );

    return (
      <div>
        { redirect ? <Redirect to="/" /> : grid }
      </div>
    );
  }
}

export default ContactForm;
