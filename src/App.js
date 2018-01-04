import "tachyons/css/tachyons.min.css";
import "material-design-icons/iconfont/material-icons.css";
import React, { Component } from "react";
import "./App.css";

import { Route } from "react-router-dom";
import DashboardPage from "./components/page/dashboard";
import PipelinePage from "./components/page/pipeline";
// import NewProjectPage from "./components/page/projectCreate";
// import ZoningsPage from "./components/page/zonings";
// import ScenesPage from "./components/page/scenes";
// import ScenePage from "./components/page/scene";
// import NewScenePage from "./components/page/sceneCreate";
// import JobsPage from "./components/page/jobs";
import Header from "./components/header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path="/" component={DashboardPage} />
        <Route
          exact
          path="/pipeline/:pipelineId([0-9]+)"
          component={PipelinePage}
        />
        {/* <Route exact path="/project/new" component={NewProjectPage} />
        <Route
          exact
          path="/project/:projectId([0-9]+)"
          component={ProjectPage}
        />
        <Route
          exact
          path="/project/:projectId/zoning"
          component={ZoningsPage}
        />
        <Route exact path="/project/:projectId/scene" component={ScenesPage} />
        <Route
          exact
          path="/project/:projectId/scene/:sceneId([0-9]+)"
          component={ScenePage}
        />
        <Route
          exact
          path="/project/:projectId/scene/new"
          component={NewScenePage}
        />
        <Route exact path="/jobs" component={JobsPage} /> */}
      </div>
    );
  }
}

export default App;
