//@flow
import React, { Component } from "react";
import PipelineList from "../pipeline/list";
import BuildList from "../build/list";
import JobList from "../job/list";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <Link
      to="/project/new"
      title="Will open the project creation page"
      className="no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center ma1 tc br2 pa1 fr mr2 mt2"
    >
      <i className="material-icons">add_circle</i>
      <span className="f6 ml1 pr2">Add project</span>
    </Link>
    <div className="cb" />
    <div className="fl w-30">
      <PipelineList />
    </div>
    <div className="fl w-30">
      <BuildList />
    </div>
    <div className="fl w-40">
      <JobList />
    </div>
  </div>
);
