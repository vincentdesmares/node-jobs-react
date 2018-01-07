import React, { Component } from "react";
import { graphql, gql } from "react-apollo";

export const updateSceneQuery = gql`
  mutation updatePipeline($id: Int!, $metadata: String!) {
    updatePipeline(id: $id, metadata: $metadata) {
      id
      name
      metadata
    }
  }
`;

class NewStepButton extends Component {
  render() {
    const { mutate, pipeline } = this.props;
    let newPipeline = { ...pipeline };
    let parsedMetadata = parsedMetadata ? JSON.parse(newPipeline.metadata) : {};
    return (
      <div>
        <button
          onClick={() => {
            if (typeof parsedMetadata.steps == "undefined") {
              parsedMetadata.steps = [];
            }
            parsedMetadata.steps = [
              ...parsedMetadata.steps,
              { order: parsedMetadata.steps.length + 1, status: "pending" }
            ];
            newPipeline.metadata = JSON.stringify(parsedMetadata);
            return mutate({
              variables: { id: newPipeline.id, metadata: newPipeline.metadata }
            });
          }}
        >
          Add step
        </button>
      </div>
    );
  }
}

export default graphql(updateSceneQuery)(NewStepButton);
