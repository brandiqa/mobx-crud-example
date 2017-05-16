import remotedev from 'mobx-remotedev';
import Store from './store';

const contactConfig = {
  name:'Contact Store',
  global: true,
  onlyActions:true,
  filters: {
    whitelist: /fetch|update|create|Event|entity|entities|handleErrors/
  }
};

const contactStore = new Store('api/contacts');

const allStores = {
  contactStore: remotedev(contactStore, contactConfig)
};

export default allStores;
