const { PubSub, withFilter, GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
// PubSub, withFilter for subscription
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

mongoose.connect("mongodb://127.0.0.1:27017/miniChat", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
mongoose.connection.once("open", () =>
    server.start(() => console.log("Server started localhost: 4000"))
);
