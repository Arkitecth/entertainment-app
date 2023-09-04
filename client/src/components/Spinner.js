import React, { Fragment } from "react";
import spinner from "../assets/spinner.gif";

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt="Loading..."
      style={{
        width: "200px",
        margin: "auto",
        marginTop: "15%",
        display: "block",
      }}
    />
  </Fragment>
);

export default Spinner;
