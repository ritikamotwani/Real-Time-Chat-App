const typeDefs = `
    type Query {
        users: [User]
        messages: [Message]
    }
    type User {
       id: ID!
       name: String!
       email: String!
       messages: [Message] 
    }
    type Message {
        id: ID!
        message: String!
        senderMail: String!
        receiverMail: String!
        timestamp: Float!
        users: [User]
    }
`;
