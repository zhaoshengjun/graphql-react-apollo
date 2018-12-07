import gql from "graphql-tag";

const recipesQuery = gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
      isStarred @client
    }
  }
`;

export default recipesQuery;
