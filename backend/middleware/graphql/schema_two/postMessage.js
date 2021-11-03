const { neDBAdd, subscribers } = require("../../../helpers");
const { GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");

module.exports = {
  type: new GraphQLNonNull(GraphQLBoolean),
  description: "This Mutation will post a message",
  args: {
    name: {type: GraphQLNonNull(GraphQLString)},
    message: {type: GraphQLNonNull(GraphQLString)},
    column: {type: GraphQLNonNull(GraphQLString)},
  },
   resolve: async (parent, {name, message, column}) => {
    let date = String(new Date());
    try {
      return await neDBAdd({ name, message, date, column })
        .then((res) => {
          //this will trigger the subscribers and give them the updated messages
          subscribers.forEach((fn) => fn());
          console.log(res);
          return true;
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err)
      return false;
    }
  },
};
