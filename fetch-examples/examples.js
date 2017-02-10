const fetch = require('isomorphic-fetch')

let todos = []
const url = path => `http://localhost:3030${path}`
const log = data => {todos = data.data; console.log(data)}
const info = message => console.log(`\n\n${message.toUpperCase()}\n----------------------------------------`)

const index = function(){
  info('Getting all todos')
  return fetch(url('/todos')).then(res => res.json()).then(log)
}

const create = function(){
  info('Creating a todo')
  return fetch(url('/todos'), {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text: 'get bread'})
  }).then(res => res.json()).then(log)
}

const modify = function(){
  info('Modifying a todo')
  return fetch(url(`/todos/${todos[0]._id}`), {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text: 'get lots of bread'})
  }).then(res => res.json()).then(log)
}

const del = function(){
  info('Deleting a todo')
  return fetch(url(`/todos/${todos[0]._id}`), { method: 'DELETE' }).then(res => res.json()).then(log)
}

index()
  .then(create)
  .then(index)
  .then(modify)
  .then(index)
  .then(del)
  .then(index)
