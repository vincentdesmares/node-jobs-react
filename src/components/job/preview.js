//@flow
import React from "react";
import { Link } from "react-router-dom";

export default ({ job }) => (
  <Link
    to={`/pipeline/1/build/${job.id}`}
    className="db mw5 black link dim pa2"
    title="Frank Ocean's Blonde on Apple Music"
    href={`/pipeline/${job.id}`}
  >
    <dl className="mt2 f6 lh-copy">
      <dd className="ml0 fw9">#{job.id}</dd>
      <dd className="ml0 gray">last edit: 22 Jan</dd>
    </dl>
  </Link>
);
