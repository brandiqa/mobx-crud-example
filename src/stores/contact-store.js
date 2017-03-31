import { observable, action } from 'mobx';
import { service } from '../client';
import _ from 'lodash';

class ContactStore {

  contactService = service('contacts')

  @observable contacts = [];
  @observable fetching = false;
  @observable error = false;

  @action
  fetchContacts = () => {
    this.fetching = true;
    this.contactService.find({})
      .then(response =>  {
        _.each(response.data, (contact => this.contacts.push(contact)));
        this.error = false;
        this.fetching = false;
      })
      .catch(err => {
        this.error = true;
        this.fetching = false;
        console.log(err)
      })
  }
}

export default new ContactStore()
