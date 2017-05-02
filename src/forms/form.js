import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

class Form extends MobxReactForm {

  store = null;

  constructor(fields, plugins, store) {
    super(fields,plugins);
    this.store = store;
  }

  onSuccess(form) {
    const store = this.store;
    if(store.entity._id){
      store.update(store.entity._id, form.values())
    }
    else {
      store.create(form.values())
    }
  }
}

export default function createForm(fields, store){
  const plugins = { dvr: validatorjs };
  return new Form({fields}, {plugins}, store);
}
