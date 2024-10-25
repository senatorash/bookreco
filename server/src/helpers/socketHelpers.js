const users = [];

export const userJoin = (id, username, room) => {
  const user = { id, username, room };

  const findUserExistIndex = users.findIndex(
    (user) => user.username === username
  );

  if (findUserExistIndex >= 0) {
    users[findUserExistIndex] = user;
    return user;
  }

  users.push(user);

  return user;
};

export const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

export const userLeave = (username) => {
  const index = users.findIndex((user) => user.userData.username === username);

  if (index >= 0) {
    return users.splice(index, 1)[0];
  }
};

export const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};
