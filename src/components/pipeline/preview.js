//@flow
import React from "react";
import { Link } from "react-router-dom";

export default ({ pipeline }) => (
  <Link
    to={`/pipeline/${pipeline.id}`}
    className="db mw5 black link dim pa2"
    title="Frank Ocean's Blonde on Apple Music"
    href={`/pipeline/${pipeline.id}`}
  >
    <dl className="mt2 f6 lh-copy">
      <dd className="ml0 fw9">{pipeline.name}</dd>
      <dd className="ml0 gray">last edit: 22 Jan</dd>
    </dl>
  </Link>
);
