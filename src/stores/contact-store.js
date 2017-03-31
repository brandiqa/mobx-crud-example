import { observable, action } from 'mobx';
import _ from 'lodash';
import { mockContacts } from '../mock-data'

class ContactStore {

  @observable contacts = [];

  @action
  fetchContacts = () => {
    _.each(mockContacts, (contact => this.contacts.push(contact)))
  }
}

export default new ContactStore()
