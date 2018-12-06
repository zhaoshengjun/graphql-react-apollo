import gql from "graphql-tag";

const recipesQuery = gql`
  query recipes($vegetarian: Boolean!) {
    recipes(vegetarian: $vegetarian) {
      id
      title
    }
  }
`;

export default recipesQuery;
