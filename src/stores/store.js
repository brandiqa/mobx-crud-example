import { observable, action } from 'mobx';
import _ from 'lodash';
import { feathersClient } from './client';

class Store {

  service = null;
  serviceName = null;
  @observable errors = {};
  @observable entity = {};
  @observable entities = [];
  @observable loading = false;
  @observable redirect = false;

  constructor(serviceName) {
    this.service = feathersClient().service(serviceName);
    this.serviceName = serviceName;
    // Capture Real-time events
    this.service.on('patched', entity => {
      this.updateEvent(entity);
    });
    this.service.on('created', entity => {
      this.addEvent(entity);
    });
    this.service.on('removed', entity => {
      this.removeEvent(entity);
    });
  }

  handleFeathersError = (err) => {
    if( err.code === 400) {
      let messages = [];
      _.each(err.errors, (value, key) => {
        messages.push(value.message);
      })
      this.errors = {global: err.message, messages}
    } else {
      this.errors = {global: err.message}
    }
  }

  @action
  fetchAll = () => {
    this.loading = true;
    this.errors = {};
    this.service.find({})
      .then(response => this.entities = response.data )
      .catch(err => this.handleFeathersError(err))
      .then(() => this.loading = false);
  }

  @action
  create = (entity) => {
    this.loading = true;
    this.errors = {};
    this.service.create(entity)
      .then(response => {
        this.entities.push(response)
        this.redirect = true;
      })
      .catch(err => this.handleFeathersError(err))
      .then(() => {
        this.loading = false;
        this.redirect = false;
      })
  }

  @action
  newEntity = () => {
    this.entity = {};
    this.errors = {};
  }

  @action
  fetch = (_id) => {
    this.entity = {};
    this.loading = true;
    this.errors = {};
    this.service.get(_id)
      .then(response => this.entity = response)
      .catch(err => this.handleFeathersError(err))
      .then(() => this.loading = false)
  }

  @action
  update = (_id, entity) => {
    this.loading = true;
    this.errors = {};
    this.service.patch(_id, entity)
      .then(response => {
        this.entities = this.entities.map(item => item._id === entity._id ? entity : item);
        this.redirect = true;
      })
      .catch(err => this.handleFeathersError(err))
      .then(() => {
        this.loading = false;
        this.redirect = false;
      })
  }

  @action
  deleteOne = (_id) => {
    this.service.remove(_id)
      .then(response => {
        this.entities = this.entities.filter(item => item._id !== _id)
      })
      .catch(err => this.handleFeathersError(err))
  }

  @action
  addEvent = (entity) => {
    const found = this.entities.find(item => item._id === entity._id)
    if(!found){
      this.entities.push(entity)
    }
  }

  @action
  updateEvent = (entity) => {
    this.entities = this.entities.map(item => item._id === entity._id ? Object.assign(item, entity) : item);
  }

  @action
  removeEvent = (entity) => {
    const found = this.entities.find(item => item._id === entity._id)
    if(found){
        this.entities = this.entities.filter(item => item._id !== entity._id)
    }
  }
}

export default Store;
