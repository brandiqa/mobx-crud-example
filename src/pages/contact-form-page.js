import React, { Component } from 'react';
import { Grid} from 'semantic-ui-react';
import ContactForm from '../components/contact-form';
import form from '../containers/contact-form';

class ContactFormPage extends Component {
  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>Add New Contact</h1>
          <ContactForm form={form}/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default ContactFormPage;
