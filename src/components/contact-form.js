import React from 'react'
import { observer } from 'mobx-react';
import { Form, Button } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import InputField from './input-field';

@observer
class ContactForm  extends React.Component {

  componentWillReceiveProps = (nextProps) => {
    const {contact} = nextProps.store;
    const { form } = this.props;
    form.update(contact)
  }

  render() {
    const { form } = this.props;
    const { redirect, loading, errors } = this.props.store
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
    )

    return (
      <div>
        { redirect ? <Redirect to="/" /> : formComponent }
      </div>
    )
  }
}

export default ContactForm;
