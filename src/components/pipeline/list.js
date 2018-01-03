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
        {pipelines.data.map(pipeline => (
          <Preview key={pipeline.id} pipeline={pipeline} />
        ))}
      </div>
    );
  }
}

export default graphql(
  gql`
    query pipelineListQuery($projectId: Int) {
      pipelines(projectId: $projectId) {
        id
        name
      }
    }
  `
)(PipelineList);
