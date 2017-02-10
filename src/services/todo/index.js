'use strict';

const service = require('feathers-mongoose');
const todo = require('./todo-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: todo,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/todos', service(options));

  // Get our initialize service to that we can bind hooks
  const todoService = app.service('/todos');

  // Set up our before hooks
  todoService.before(hooks.before);

  // Set up our after hooks
  todoService.after(hooks.after);
};
