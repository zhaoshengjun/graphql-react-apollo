import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

client
  .query({
    query: gql`
      {
        recipes {
          id
          title
        }
      }
    `
  })
  .then(result => console.log(result));

class App extends Component {
  render() {
    return <div>Hello World</div>;
  }
}

export default App;
