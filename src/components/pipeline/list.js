//@flow
import React, { Component } from "react";
import Preview from "./preview";
import { gql, graphql } from "react-apollo";

class PipelineList extends Component {
  render() {
    const { data: { loading, error, pipelines } } = this.props;

    if (loading || error) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <h1>Pipelines</h1>
        {pipelines.map(pipeline => (
          <Preview key={pipeline.id} pipeline={pipeline} />
        ))}
      </div>
    );
  }
}

export default graphql(
  gql`
    query pipelineListQuery {
      pipelines {
        id
        name
      }
    }
  `
)(PipelineList);
