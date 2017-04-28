import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socket from 'feathers-socketio/client';
import io from 'socket.io-client';

let instance = false;
const uri = 'http://localhost:3030/';

export function client() {
  if (instance) return instance;

  instance = feathers()
    .configure(socket(io(uri)))
    .configure(hooks());

  return instance;
}

export function service(name) {
  return client().service(name);
}
