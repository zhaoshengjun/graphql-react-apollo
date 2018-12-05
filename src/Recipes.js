import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export default function() {
  return (
    <Query
      query={gql`
        {
          recipes {
            id
            title
          }
        }
      `}
    >
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Something went wrong</p>;
        if (data.recipes === undefined) return null;
        return (
          <ul>
            {data.recipes.map(({ id, title }) => (
              <li key={id}>{title}</li>
            ))}
          </ul>
        );
      }}
    </Query>
  );
}
