import React, { Component } from 'react';
import { Grid} from 'semantic-ui-react';
import validatorjs from 'validatorjs';
const plugins = { dvr: validatorjs };
import MobxReactFormDevTools from 'mobx-react-form-devtools';
import ContactForm from '../components/contact-form';
import Form, {fields} from '../forms/contact';
import store from '../stores/contact-store';


class ContactFormPage extends Component {

  form = null;

  componentWillMount() {
    this.form = new Form({fields},{plugins});
    MobxReactFormDevTools.register({
      contactForm: this.form
    });
    MobxReactFormDevTools.select('contactForm');
  }

  render() {
    return (
      <div>
        <MobxReactFormDevTools.UI />
        <Grid centered columns={2}>
          <Grid.Column>
            <h1 style={{marginTop:"1em"}}>Add New Contact</h1>
            <ContactForm form={this.form} store={store}/>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default ContactFormPage;
