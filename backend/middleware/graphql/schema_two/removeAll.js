const { neDBRemoveAll, subscribers } = require("../../../helpers");
const { GraphQLNonNull, GraphQLID, GraphQLBoolean } = require("graphql");

module.exports = {
  type: new GraphQLNonNull(GraphQLBoolean),
  description: "This Mutation will remove all messages",
   resolve: async (parent, ) => {
    try {
      return await neDBRemoveAll()
        .then((res) => {
          //this will trigger the subscribers and give them the updated messages
          subscribers.forEach((fn) => fn());
          return true;
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log('error ' + err)
      return false;
    }
  },
};
