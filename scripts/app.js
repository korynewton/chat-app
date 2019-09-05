// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

// change name
updateNameForm.addEventListener('submit', e => {
  e.preventDefault();
  // update name via chatroom
  const name = updateNameForm.name.value.trim();
  chatroom.updateName(name);
  // reset form
  updateNameForm.reset();

  //show then hide update method
  updateMssg.innerText = `Your name was updated to ${name}`;
  setTimeout(() => (updateMssg.innerText = ''), 3000);
});

// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value;
  chatroom
    .addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

//  update chatroom
rooms.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

// check local storage for username
const username = localStorage.username ? localStorage.username : 'anon';
// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats and render
chatroom.getChats(data => chatUI.render(data));
