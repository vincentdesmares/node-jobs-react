//@flow
import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PipelineStep from "../pipeline/step";
import { gql, graphql } from "react-apollo";
import NewStepButton from "../pipeline/stepCreate";
import AddSlot from "../pipeline/addSlot";
// import RunGenerationButton from "../pipeline/runGenerationButton";

const getQuery = gql`
  query pipelineQuery($id: Int!) {
    pipeline(id: $id) {
      id
      name
      metadata
    }
  }
`;

class PipelinePage extends Component {
  componentWillMount() {
    this.props.subscribeToJobUpdates();
  }

  render() {
    const { data: { pipeline, loading } } = this.props;

    if (loading) {
      return <p>Loading ...</p>;
    }

    const { steps } = pipeline.metadata ? JSON.parse(pipeline.metadata) : {};
    return (
      <div className="pa2">
        <h2 className="fl">{pipeline.name} </h2>
        <NewStepButton pipeline={pipeline} />
        {/* <RunGenerationButton pipeline={pipeline} /> */}
        <div className="cb" />
        <AddSlot pipeline={pipeline} />
        <div className="ba b--black relative mt3">
          <div
            className="bg-light-gray absolute z-0"
            style={{
              width: "30%",
              height: "100%"
            }}
          />
          <div className="z-1 relative pa1 ml2">0%</div>
        </div>
        <div className="cb" />
        <div className="mt3 ba b--black flex overflow-x-scroll">
          {steps &&
            steps.map((step, index) => {
              //@todo Replace with reselect asap
              const batch = pipeline.batches
                ? pipeline.batches.find(batch => step.batchId === batch.id)
                : null;
              return <PipelineStep key={index} step={step} batch={batch} />;
            })}
          <div className="cb" />
        </div>
      </div>
    );
  }
}

const subscriptionJobUpdated = gql`
  subscription onJobUpdated {
    jobUpdated {
      id
      type
      name
      input
      output
      status
    }
  }
`;

const getWithData = graphql(getQuery, {
  options: ({ match }) => ({
    variables: {
      id: match.params.pipelineId
    }
  }),
  props: ({ data, ownProps }) => {
    const subscribeToJobUpdates = params =>
      data.subscribeToMore({
        document: subscriptionJobUpdated,
        updateQuery(prev, { subscriptionData }) {
          const { job } = subscriptionData.data;
          if (!data.batches) {
            return data;
          }
          let batch = data.batches.find(batch => (batch.id = job.batchId));
          let outdatedJob = batch.jobs.find(j => (j.id = job.id));
          outdatedJob = job;
          return data;
        }
      });
    return { data, subscribeToJobUpdates };
  }
})(PipelinePage);

export default getWithData;
