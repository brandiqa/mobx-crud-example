import React from 'react'
import { observer } from 'mobx-react';
import { Form, Button } from 'semantic-ui-react';
import classnames from 'classnames';
import { Redirect } from 'react-router';

@observer
class ContactForm  extends React.Component {
  render() {
    const { form } = this.props;
    const { redirect } = this.props.store
    const formComponent = (
      <Form onSubmit={form.onSubmit}>

        <Form.Group widths='equal'>

          <Form.Field className={classnames({error:form.$('name.first').error})}>
            <label htmlFor={form.$('name.first').id}>
              {form.$('name.first').label}
            </label>
            <input {...form.$('name.first').bind()} />
            <span className="error">{form.$('name.first').error}</span>
          </Form.Field>

          <Form.Field>
            <label htmlFor={form.$('name.last').id}>
              {form.$('name.last').label}
            </label>
            <input {...form.$('name.last').bind()} />
            <span className="error">{form.$('name.last').error}</span>
          </Form.Field>

        </Form.Group>

        <Form.Field>
          <label htmlFor={form.$('phone').id}>
            {form.$('phone').label}
          </label>
          <input {...form.$('phone').bind()} />
          <span className="error">{form.$('phone').error}</span>
        </Form.Field>

        <Form.Field>
          <label htmlFor={form.$('email').id}>
            {form.$('email').label}
          </label>
          <input {...form.$('email').bind()} />
          <span className="error">{form.$('email').error}</span>
        </Form.Field>

        <Button primary type='submit' onClick={form.onSubmit}>Save</Button>

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
