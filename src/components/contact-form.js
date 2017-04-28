import React from 'react';
import { observer } from 'mobx-react';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import InputField from './input-field';

@observer
class ContactForm extends React.Component {

  componentWillReceiveProps = (nextProps) => {
    const contact = nextProps.contact;
    this.props.form.update(contact);
  }

  render() {
    const { form } = this.props;
    const { redirect, loading, errors, entity:contact } = this.props.store;
    const messages = errors.messages ? errors.messages.toJS() : [];

    const errorMessages = (
      <Message negative header={errors.global} list={messages.reverse()}/>
    )

    const contactForm = (
      <Form onSubmit={form.onSubmit} loading={loading}>
        <Form.Group widths='equal'>
          <InputField field={form.$('name.first')} />
          <InputField field={form.$('name.last')} />
        </Form.Group>
        <InputField field={form.$('phone')} />
        <InputField field={form.$('email')} />
        <Button primary type='submit' onClick={form.onSubmit} disabled={form.isPristine}>Save Contact</Button>
      </Form>
    );

    const grid = (
      <div>
        <Grid centered columns={2}>
          <Grid.Column>
            <h1 style={{marginTop:"1em"}}>{ contact._id ? 'Edit Contact' : 'Add New Contact' }</h1>
            {errors.global && errorMessages }
            {contactForm}
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
