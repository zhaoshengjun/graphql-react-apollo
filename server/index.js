const { ApolloServer, gql } = require("apollo-server");

const recipes = [
  { id: 1, title: "Yammy Pumpkin", vegetarian: true },
  { id: 2, title: "Egg Roll", vegetarian: false }
];

const typeDefs = gql`
  type Recipe {
    id: Int
    title: String
    vegetarian: Boolean
  }
  type Query {
    recipes(vegetarian: Boolean): [Recipe]
  }
`;
const resolvers = {
  Query: {
    recipes: (parent, args, context, info) => {
      const { vegetarian } = args;
      if (vegetarian === undefined) {
        return recipes;
      } else {
        return recipes.filter(recipe => recipe.vegetarian === vegetarian);
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
