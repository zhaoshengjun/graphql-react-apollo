import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import recipesQuery from "./recipesQuery";

const updateRecipeStarredMutation = gql`
  mutation updateRecipeStarred($id: Int!, $isStarred: Boolean!) {
    updateRecipeStarred(id: $id, isStarred: $isStarred) @client
  }
`;

export default class Recipes extends Component {
  state = {
    vegetarian: false
  };

  updateVegetarian = ({ target: { checked } }) => {
    this.setState({ vegetarian: checked });
  };

  render() {
    const { vegetarian } = this.state;
    return (
      <Fragment>
        <label>
          <input
            type="checkbox"
            checked={this.state.vegetarian}
            onChange={this.updateVegetarian}
          />
          <span>Vegetarian</span>
        </label>
        <Query query={recipesQuery} variables={{ vegetarian }}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Something went wrong</p>;
            if (data.recipes === undefined) return null;
            return (
              <ul>
                {data.recipes.map(({ id, title, isStarred }) => (
                  <li key={id}>
                    {title}
                    <span style={{ color: isStarred ? "orange" : "grey" }}>
                      ★
                    </span>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}
