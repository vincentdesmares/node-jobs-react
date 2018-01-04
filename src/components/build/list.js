//@flow
import React, { Component } from "react";
import Preview from "./preview";
import { gql, graphql } from "react-apollo";

class BuildList extends Component {
  render() {
    const { data: { loading, error, builds } } = this.props;

    if (loading || error) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <h1>Builds</h1>
        {builds.map(build => <Preview key={build.id} build={build} />)}
      </div>
    );
  }
}

export default graphql(
  gql`
    query buildListQuery {
      builds {
        id
        name
      }
    }
  `
)(BuildList);
