import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>Hello World</div>;
        <ApolloConsumer>
          {client => {
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
            return null;
          }}
        </ApolloConsumer>
      </ApolloProvider>
    );
  }
}

export default App;
