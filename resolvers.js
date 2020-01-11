const resolvers = {
  Query: {
    users: () => User.find(),
    messages: () => Message.find()
  },
};
