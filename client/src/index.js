import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory'
import "./index.css";
import App from "./App";

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/'
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/`,
    options: {
        reconnect: true
    }
});

const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);
// query mutation to httpLink, Subscription to wsLink

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

//client provided everywhere
ReactDOM.render(
<ApolloProvider client={client}>
    <App />
    </ApolloProvider>,
document.getElementById("root")
);
