//@flow
import React, { Component } from "react";
import Preview from "./preview";
import { gql, graphql } from "react-apollo";

class JobList extends Component {
  render() {
    const { data: { loading, error, jobs } } = this.props;

    if (loading || error) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <h1>Jobs</h1>
        {jobs.map(job => <Preview key={job.id} job={job} />)}
      </div>
    );
  }
}

export default graphql(
  gql`
    query jobListQuery {
      jobs {
        id
        name
      }
    }
  `
)(JobList);
