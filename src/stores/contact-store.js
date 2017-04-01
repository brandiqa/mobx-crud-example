import { observable, action } from 'mobx';
import { service } from '../client';
import _ from 'lodash';

class ContactStore {

  contactService = service('contacts')

  @observable contacts = [];
  @observable fetching = false;
  @observable error = false;
  @observable loading = false;
  @observable redirect=true;

  @action
  fetchContacts = () => {
    this.fetching = true;
    this.contactService.find({})
      .then(response =>  {
        this.contacts = response.data;
        this.error = false;
        this.fetching = false;
        this.redirect = false;
      })
      .catch(err => {
        this.error = true;
        this.fetching = false;
        console.log("fetchContacts err:", err)
      })
  }

  saveContact = (contact) => {
    this.loading = true;
    this.contactService.create(contact)
      .then(response => {
        this.contacts.push(response)
        this.loading = false;
        this.redirect = true;
      })
      .catch(err => {
        this.error = true;
        this.loading = false;
        this.redirect = false;
        console.log("saveContact err", err)
      })
  }
}

export default new ContactStore()
