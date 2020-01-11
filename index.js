const { PubSub, withFilter, GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
// PubSub, withFilter for subscription

mongoose.connect("mongodb://127.0.0.1:27017/miniChat", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});
