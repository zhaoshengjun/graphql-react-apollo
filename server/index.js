const { ApolloServer, gql } = require("apollo-server");

const recipes = [
  { id: 1, title: "Yammy Pumpkin", vegetarian: true },
  { id: 2, title: "Egg Roll", vegetarian: false }
];

const findNextId = () => {
  return parseInt(recipes.length + 1);
};

const typeDefs = gql`
  type Recipe {
    id: Int
    title: String
    vegetarian: Boolean
  }

  input RecipeInput {
    title: String!
    vegetarian: Boolean!
  }
  type Query {
    recipes(vegetarian: Boolean): [Recipe]
  }
  type Mutation {
    addRecipe(recipe: RecipeInput): Recipe
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
  },
  Mutation: {
    addRecipe: (parent, args, context, info) => {
      const { title, vegetarian } = args.recipe;
      const recipe = {
        id: findNextId(),
        title,
        vegetarian
      };
      recipes.push(recipe);
      return recipe;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
