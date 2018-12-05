const { ApolloServer, gql } = require("apollo-server");

const recipes = [
  { id: 1, title: "Yammy Pumpkin" },
  { id: 2, title: "Egg Roll" }
];

const typeDefs = gql`
  type Recipe {
    id: Int
    title: String
  }
  type Query {
    recipes: [Recipe]
  }
`;
const resolvers = {
  Query: {
    recipes: () => recipes
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
