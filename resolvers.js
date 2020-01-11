const resolvers = {
  Query: {
    users: () => User.find(),
    messages: () => Message.find()
  },
  User: {
    messages: async ({ email }) => {
      return Message.find({ senderEmail: email });
    }
  },
  Message: {
    users: async ({ senderEmail }) => {
      return User.find({ email: senderEmail })
    }
  }
};
