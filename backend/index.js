const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const {execute, subscribe} = require('graphql')
const  { SubscriptionServer } = require('subscriptions-transport-ws');
const {ApolloServer} = require('apollo-server-express');

//two schemas to choose from but achieve the same purpose. schema is SDL and gqlSchema is GraphQL Object Type.
const { gqlSchema} = require('./middleware/graphql');

//webpack server configuration + hot reloading
require('./middleware/webpack')(app)

//The necessities to get graphql subscription to work
const { createServer } = require('http')
const subServ = createServer(app);

//subscription will be at /subscriptions
subServ.listen(8080, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema: gqlSchema
    }, {
      server: subServ,
      path: '/subscriptions'
    });
});

//setting up our graphql server
const graphqlServer = new ApolloServer({ schema: gqlSchema, context: (req, res) => ({req, res}), playground: true, subscriptions: {path: '/subscriptions'} })
graphqlServer.applyMiddleware({app});

//I forgot why I added cors and too afraid to remove to find out why.
app.use(cors())

// from react, I only have two routes
app.get(["*"], (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});


