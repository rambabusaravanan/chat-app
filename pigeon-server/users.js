// const { v4: uuidv4 } = require("uuid");

const users = [];

function getUsers() {
  return users;
}

function addUser(user) {
  // user = { id: uuidv4(), ...user };
  users.push(user);
  // return user;
}

function removeUser(id) {
  const i = users.findIndex(u => u.id === id);
  if(i !== -1) return users.splice(i, 1)[0];
}

module.exports = {
  getUsers,
  addUser,
  removeUser
};
