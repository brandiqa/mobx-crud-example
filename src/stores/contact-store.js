import { observable, action } from 'mobx';
import { service } from '../client';

const normalizeNestedErrors = (data) => {
  const { "name.first":first, "name.last":last, phone, email } = data;
  return {
    first: first ? first.message: '',
    last: last ? last.message : '',
    phone: phone ? phone.message : '',
    email: email ? email.message : ''
  }
}

class ContactStore {

  contactService = service('contacts')

  @observable contacts = [];
  @observable fetching = false;
  @observable error = false;
  @observable loading = false;
  @observable redirect=false;
  @observable errors = {};

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

  @action
  saveContact = (contact) => {
    this.loading = true;
    this.contactService.create(contact)
      .then(response => {
        this.contacts.push(response)
        this.loading = false;
        this.redirect = true;
        this.errors = {};
      })
      .catch(err => {
        const json = JSON.stringify(err);
        const feathersErrors = JSON.parse(json).errors;
        const errors = Object.assign({}, normalizeNestedErrors(feathersErrors));
        this.errors = errors;
        this.error = true;
        this.loading = false;
        this.redirect = false;
      })
  }
}

export default new ContactStore()
