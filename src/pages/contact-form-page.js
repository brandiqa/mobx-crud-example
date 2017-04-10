import React, { Component } from 'react';
import { Grid} from 'semantic-ui-react';
import validatorjs from 'validatorjs';
import MobxReactFormDevTools from 'mobx-react-form-devtools';
import ContactForm from '../components/contact-form';
import Form, {fields} from '../forms/contact';
import store from '../stores/contact-store';
import { observer } from 'mobx-react';

@observer
class ContactFormPage extends Component {

  form = null;

  componentWillMount() {
    const plugins = { dvr: validatorjs };
    this.form = new Form({fields},{plugins});
    MobxReactFormDevTools.register({
      contactForm: this.form
    });
    MobxReactFormDevTools.select('contactForm');
  }

  componentDidMount() {
    const { _id } = this.props.match.params;
    if(_id){
      store.fetchContact(_id)
    } else {
      store.newContact();
    }
  }

  render() {
    return (
      <div>
        <MobxReactFormDevTools.UI />
        <Grid centered columns={2}>
          <Grid.Column>
            <h1 style={{marginTop:"1em"}}>Add New Contact</h1>
            <ContactForm form={this.form} store={store} contact={store.contact}/>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default ContactFormPage;
