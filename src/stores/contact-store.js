import { observable, action } from 'mobx';
import { service } from '../client';

const decodeFeathersErrors = (data) => {
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
  @observable contact = {name:{}};
  @observable loading = false;
  @observable redirect=false;
  @observable errors = {};

  @action
  fetchContacts = () => {
    this.loading = true;
    this.contactService.find({})
      .then(response =>  {
        this.contacts = response.data;
        this.errors = {};
        this.loading = false;
        this.redirect = false;
      })
      .catch(err => {
        this.loading = false;
        this.errors = { global: 'Back-end server is Unreachable'}
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
        const errors = Object.assign({}, decodeFeathersErrors(feathersErrors));
        this.errors = errors;
        this.loading = false;
        this.redirect = false;
      })
  }

  @action
  newContact = () => {
    this.contact = {name:{}};
  }

  @action
  fetchContact = (_id) => {
    this.loading = true;
    this.contactService.get(_id)
      .then(response => {
        this.contact = response;
        this.loading = false;
        this.errors = {}
      })
      .catch(err => {
        this.errors = {global: err.message}
        this.loading = false;
      })
  }

  @action
  updateContact = (contact) => {
    this.loading = true;
    this.contactService.update(contact._id, contact)
      .then(response => {
        this.contacts = this.contacts.map(item => item._id === contact._id ? contact : item);
        this.loading = false;
        this.redirect = true;
        this.errors = {};
      })
      .catch(err => {
        const json = JSON.stringify(err);
        const feathersErrors = JSON.parse(json).errors;
        const errors = Object.assign({}, decodeFeathersErrors(feathersErrors));
        this.errors = errors;
        this.loading = false;
        this.redirect = false;
      })
  }

  deleteContact = (_id) => {
    this.contactService.remove(_id)
      .then(response => {
        this.contacts = this.contacts.filter(item => item._id !== _id)
      })
      .catch(err => {
        this.errors = {global: "Something went wrong"}
      })
  }
}

export default new ContactStore()
