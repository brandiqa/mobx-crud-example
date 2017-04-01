import React from 'react'
import { observer } from 'mobx-react';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import InputField from './input-field';

@observer
class ContactForm  extends React.Component {

  render() {
    const { form } = this.props;
    const { redirect, loading } = this.props.store
    const formComponent = (
      <Form onSubmit={form.onSubmit} loading={loading}>
        <Form.Group widths='equal'>
          <InputField field={form.$('name.first')} />
          <InputField field={form.$('name.last')} />
        </Form.Group>
        <InputField field={form.$('phone')} />
        <InputField field={form.$('email')} />
        <Button primary type='submit' onClick={form.onSubmit} disabled={form.isPristine}>Save</Button>
        <p>{form.error}</p>
      </Form>
    )

    return (
      <div>
        { redirect ? <Redirect to="/" /> : formComponent }
      </div>
    )
  }
}

export default ContactForm;
