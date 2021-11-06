const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt
} = require("graphql");

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => {
    return {
      _id: { type: GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLNonNull(GraphQLString) },
      date: { type: GraphQLNonNull(GraphQLString) },
      message: { type: GraphQLNonNull(GraphQLString) },
      column: { type: GraphQLNonNull(GraphQLString) },
      like: {type: GraphQLNonNull(GraphQLInt)}
    };
  },
});

module.exports = MessageType;
