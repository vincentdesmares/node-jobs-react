import React, { Component } from "react";
import { graphql, gql } from "react-apollo";

export const updatePipelineQuery = gql`
  mutation updatePipeline($id: Int!, $metadata: String!) {
    updatePipeline(id: $id, metadata: $metadata) {
      id
      name
      metadata
    }
  }
`;

class NewSlotButton extends Component {
  constructor() {
    super();
    this.state = { stepIndex: 0 };
  }
  render() {
    const { mutate, pipeline } = this.props;
    let newPipeline = { ...pipeline };
    let parsedMetadata = newPipeline.metadata
      ? JSON.parse(newPipeline.metadata)
      : {};
    return (
      <div>
        <div>
          <select
            onChange={event => {
              this.setState({ stepIndex: event.target.value });
            }}
          >
            {parsedMetadata &&
              parsedMetadata.steps &&
              parsedMetadata.steps.map(step => (
                <option key={step.order} value={step.order - 1}>
                  {step.order}
                </option>
              ))}
          </select>
          <span
            className="ba b--black pa2"
            onClick={() => {
              if (typeof parsedMetadata.steps == "undefined") {
                parsedMetadata.steps = [];
              }
              if (
                typeof parsedMetadata.steps[this.state.stepIndex].slots ==
                "undefined"
              ) {
                parsedMetadata.steps[this.state.stepIndex].slots = [];
              }
              if (typeof parsedMetadata.slotCount == "undefined") {
                parsedMetadata.slotCount = 0;
              }

              parsedMetadata.steps[this.state.stepIndex].slots.push({
                type: "heightmap",
                status: "unassigned",
                id: parsedMetadata.slotCount + 1
              });
              parsedMetadata.slotCount += 1;
              newPipeline.metadata = JSON.stringify(parsedMetadata);
              return mutate({
                variables: {
                  id: newPipeline.id,
                  metadata: newPipeline.metadata
                }
              });
            }}
          >
            Click me to add a heightmap job
          </span>
        </div>
      </div>
    );
  }
}

export default graphql(updatePipelineQuery)(NewSlotButton);
