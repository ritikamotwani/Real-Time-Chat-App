const { PubSub, withFilter } = require("graphql-yoga");
const { User, Message } = require('./models');

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
  },
  Mutation: {
      createUser: async(_, { name, email }) => {
          const user = new User({ name, email });
          await user.save();
          pubsub.publish("newUser", {newUser: user});
          return user;
      },
      updateUser: async (_, { id, name }) => {
          const user = await User.findOneAndUpdate(
              { _id: id },
              { name },
              { new: true }
          );
          return user;
      },
      deleteUser: async(_, { email }) => {
          await Promise.all([
              User.findOneAndDelete({ email: email }),
              Message.deleteMany({ senderEmail: email })
          ]);
          pubsub.publish("oldUser", { oldUser: email });
          return true;
      },

      userTyping: (_, { email, receiverMail }) => {
          pubsub.publish("userTyping", { userTyping: email, receiverMail });
          return true;
      },

      createMessage: async (
          _,
          { senderMail, receiverMail, message, timestamp }
      ) => {
          const userText = new Message({
              senderMail,
              receiverMail,
              message,
              timestamp
          });
          await userText.save();
          pubsub.publish("newMessage", {
              newMessage: userText,
              receiverMail: receiverMail
          });
          return userText;
      },
      updateMessage: async (_, { id, message }) => {
          const userText = await Message.findOneAndUpdate(
              { _id: id },
              { message },
              { new: true }
          );
          return userText;
      },
      deleteMessage: async (_, { id }) => {
          await Message.findOneAndDelete({ _id: id });
          return true;
      }
  }
};
