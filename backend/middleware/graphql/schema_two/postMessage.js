const { neDBAdd, subscribers } = require("../../../helpers");
const { GraphQLNonNull, GraphQLString, GraphQLBoolean, GraphQLInt } = require("graphql");

module.exports = {
  type: new GraphQLNonNull(GraphQLBoolean),
  description: "This Mutation will post a message",
  args: {
    name: {type: GraphQLNonNull(GraphQLString)},
    message: {type: GraphQLNonNull(GraphQLString)},
    column: {type: GraphQLNonNull(GraphQLString)},
    like: {type: GraphQLNonNull(GraphQLInt)}
  },
   resolve: async (parent, {name, message, column, like}) => {
    let date = String(new Date());
    try {
      return await neDBAdd({ name, message, date, column, like})
        .then((res) => {
          console.log(res);
          //this will trigger the subscribers and give them the updated messages
          subscribers.forEach((fn) => fn());
          return true;
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err)
      return false;
    }
  },
};
