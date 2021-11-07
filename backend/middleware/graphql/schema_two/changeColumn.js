const { neDBAdd, subscribers, neDBColumnChange } = require("../../../helpers");
const { GraphQLNonNull, GraphQLBoolean, GraphQLInt, GraphQLID, GraphQLString } = require("graphql");

module.exports = {
  type: new GraphQLNonNull(GraphQLBoolean),
  description: "This Mutation will post a message",
  args: {
    id: {type: GraphQLNonNull(GraphQLID)},
    column: {type: GraphQLNonNull(GraphQLString)}
  },
   resolve: async (parent, {id, column}) => {

    try {
      return await neDBColumnChange({ id, column })
        .then((res) => {
            console.log(res);
          //this will trigger the subscribers and give them the updated messages
          subscribers.forEach((fn) => fn());
          return true;
        })
        .catch((err) => false);
    } catch (err) {
      console.log(err)
      return false;
    }
  },
};
