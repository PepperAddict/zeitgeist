const { neDBAdd, subscribers, neDBUpdate } = require("../../../helpers");
const { GraphQLNonNull, GraphQLBoolean, GraphQLInt, GraphQLID } = require("graphql");

module.exports = {
  type: new GraphQLNonNull(GraphQLBoolean),
  description: "This Mutation will post a message",
  args: {
    id: {type: GraphQLNonNull(GraphQLID)},
    like: {type: GraphQLInt}
  },
   resolve: async (parent, {id, like}) => {

    try {
      return await neDBUpdate({ id, like })
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
